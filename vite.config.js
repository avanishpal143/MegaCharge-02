import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import crypto from 'node:crypto'
import { sendPaymentAlertEmail } from './api/sendEmailAlert.js'

function razorpayDevApiPlugin() {
  return {
    name: 'razorpay-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== '/api/create-order' && url !== '/api/verify-payment') {
          return next();
        }

        const env = loadEnv(server.config.mode, process.cwd(), '');
        const keyId = env.VITE_RAZORPAY_KEY_ID || env.RAZORPAY_KEY_ID || env.RAZORPAY_API_KEY || process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_API_KEY;
        const keySecret = env.RAZORPAY_KEY_SECRET || env.RAZORPAY_SECRET_KEY || process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET_KEY;

        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          return res.end();
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end(JSON.stringify({ error: 'Method not allowed. Only POST is accepted.' }));
        }

        let rawBody = '';
        req.on('data', chunk => { rawBody += chunk; });
        req.on('end', async () => {
          let body = {};
          try {
            if (rawBody) body = JSON.parse(rawBody);
          } catch {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'Invalid JSON request body.' }));
          }

          if (url === '/api/create-order') {
            if (!keyId || !keySecret) {
              res.statusCode = 400;
              return res.end(JSON.stringify({
                error: 'Razorpay keys missing in .env! Please set VITE_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file.'
              }));
            }

            try {
              const { amount, currency = 'INR', receipt, notes } = body;
              if (!amount || isNaN(amount) || Number(amount) <= 0) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Invalid amount in paise.' }));
              }

              const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
              const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${auth}`
                },
                body: JSON.stringify({
                  amount: Math.round(Number(amount)),
                  currency,
                  receipt: receipt || `rcpt_${Date.now()}`,
                  notes: notes || {}
                })
              });

              const rzpData = await rzpResponse.json();
              res.statusCode = rzpResponse.status;
              return res.end(JSON.stringify(rzpData));
            } catch (err) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: err.message || 'Internal error creating order' }));
            }
          }

          if (url === '/api/verify-payment') {
            if (!keySecret) {
              res.statusCode = 400;
              return res.end(JSON.stringify({
                error: 'RAZORPAY_KEY_SECRET is missing. Please add it to your .env file.'
              }));
            }

            try {
              const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
              if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Missing payment signature verification fields.' }));
              }

              const bodyStr = `${razorpay_order_id}|${razorpay_payment_id}`;
              const expectedSignature = crypto
                .createHmac('sha256', keySecret)
                .update(bodyStr)
                .digest('hex');

              const isValid = expectedSignature === razorpay_signature;
              
              if (isValid) {
                // Trigger email in dev server too
                sendPaymentAlertEmail({
                  paymentId: razorpay_payment_id,
                  orderId: razorpay_order_id,
                  amount: body.amount,
                  productName: body.productName,
                  customer: body.customer,
                  notes: body.notes,
                }).catch(e => console.error('Dev email alert error:', e));
              }

              res.statusCode = isValid ? 200 : 400;
              return res.end(JSON.stringify({
                success: isValid,
                message: isValid ? 'Payment verified successfully' : 'Invalid payment signature',
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id
              }));
            } catch (err) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: err.message || 'Verification failed' }));
            }
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), razorpayDevApiPlugin()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]',
      },
    },
  },
})

