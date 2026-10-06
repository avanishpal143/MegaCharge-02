/**
 * Vercel Serverless Function: /api/create-order
 * Creates an order directly with Razorpay API using Key ID and Key Secret.
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST is accepted.' });
  }

  const keyId = process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_API_KEY;
  const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET_KEY;

  if (!keyId || !keySecret) {
    return res.status(500).json({
      error: 'Razorpay credentials (VITE_RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET) are missing on the server.'
    });
  }

  try {
    const { amount, currency = 'INR', receipt, notes } = req.body || {};

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid amount. Amount must be a positive number in paise.' });
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: Math.round(Number(amount)),
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        notes: notes || {},
      }),
    });

    const data = await rzpResponse.json();

    if (!rzpResponse.ok) {
      return res.status(rzpResponse.status).json({
        error: data.error?.description || data.error?.message || 'Failed to create Razorpay order',
        details: data
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error while creating Razorpay order.'
    });
  }
}
