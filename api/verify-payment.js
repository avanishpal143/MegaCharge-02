/**
 * Vercel Serverless Function: /api/verify-payment
 * Verifies Razorpay payment signature using HMAC SHA256 with Key Secret.
 */

import crypto from 'node:crypto';
import { sendPaymentAlertEmail } from './sendEmailAlert.js';

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

  const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET_KEY;

  if (!keySecret) {
    return res.status(500).json({
      error: 'RAZORPAY_KEY_SECRET is not configured on the server.'
    });
  }

  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      amount,
      productName,
      customer,
      notes
    } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        error: 'Missing required fields: razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.'
      });
    }

    // Generate expected HMAC-SHA256 signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      // Fire-and-forget email alert to admin
      sendPaymentAlertEmail({
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        amount,
        productName,
        customer,
        notes,
      }).catch(err => console.error('Background email alert error:', err));

      return res.status(200).json({
        success: true,
        message: 'Payment signature verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        verifiedAt: new Date().toISOString()
      });
    } else {
      return res.status(400).json({
        success: false,
        error: 'Invalid payment signature. Verification failed.'
      });
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error while verifying payment signature.'
    });
  }
}
