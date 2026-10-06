/**
 * api/sendEmailAlert.js
 * Sends an email notification to admin when a payment is verified.
 * Supports:
 * 1. Resend API (if RESEND_API_KEY is provided)
 * 2. Nodemailer SMTP (Gmail, Google Workspace, Zoho, Hostinger, cPanel)
 */

import nodemailer from 'nodemailer';

export async function sendPaymentAlertEmail({
  paymentId,
  orderId,
  amount,
  productName,
  customer = {},
  notes = {},
}) {
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || 'support@megacharge.co.in';
  const cleanPhone = (customer.phone || '').replace(/\D/g, '');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New MegaCharge Booking</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 28px; text-align: center; border-bottom: 4px solid #EE8A33; }
        .logo-text { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 1px; margin: 0; }
        .logo-highlight { color: #EE8A33; }
        .badge { display: inline-block; background: #16a34a; color: #ffffff; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; margin-top: 12px; }
        .content { padding: 28px; }
        .amount-box { background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 18px; text-align: center; margin-bottom: 24px; }
        .amount-label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 600; letter-spacing: 0.5px; }
        .amount-value { font-size: 32px; font-weight: 800; color: #16a34a; margin: 4px 0 0; }
        .details-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .details-table td { padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .label { color: #64748b; font-weight: 500; width: 38%; }
        .val { color: #0f172a; font-weight: 600; text-align: right; }
        .action-btns { text-align: center; margin: 28px 0 10px; }
        .btn { display: inline-block; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px; margin: 0 6px; }
        .btn-wa { background: #25D366; color: #ffffff; }
        .btn-call { background: #0f172a; color: #ffffff; }
        .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 class="logo-text">MEGA<span class="logo-highlight">CHARGE</span></h1>
          <div class="badge">Payment Verified via Razorpay</div>
        </div>

        <div class="content">
          <div class="amount-box">
            <div class="amount-label">Verified Payment Received</div>
            <div class="amount-value">₹${Math.round(amount || 0).toLocaleString('en-IN')}</div>
          </div>

          <table class="details-table">
            <tr>
              <td class="label">Product / Station:</td>
              <td class="val">${productName || 'EV Charging Station'}</td>
            </tr>
            <tr>
              <td class="label">Customer Name:</td>
              <td class="val">${customer.name || 'N/A'}</td>
            </tr>
            <tr>
              <td class="label">Customer Phone:</td>
              <td class="val"><a href="tel:${cleanPhone}" style="color: #EE8A33; text-decoration: none;">${customer.phone || 'N/A'}</a></td>
            </tr>
            <tr>
              <td class="label">Customer Email:</td>
              <td class="val">${customer.email || 'Not Provided'}</td>
            </tr>
            <tr>
              <td class="label">Razorpay Payment ID:</td>
              <td class="val" style="font-family: monospace;">${paymentId}</td>
            </tr>
            <tr>
              <td class="label">Razorpay Order ID:</td>
              <td class="val" style="font-family: monospace;">${orderId}</td>
            </tr>
            <tr>
              <td class="label">Timestamp:</td>
              <td class="val">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
            </tr>
            ${notes.message ? `
            <tr>
              <td class="label">Customer Notes:</td>
              <td class="val" style="font-style: italic;">"${notes.message}"</td>
            </tr>` : ''}
          </table>

          <div class="action-btns">
            ${cleanPhone ? `
            <a href="https://wa.me/91${cleanPhone.replace(/^91/, '')}?text=Hi%20${encodeURIComponent(customer.name || '')},%20we%20have%20received%20your%20payment%20for%20MegaCharge%20station." class="btn btn-wa" target="_blank">
              WhatsApp Customer
            </a>
            <a href="tel:${cleanPhone}" class="btn btn-call">
              Call Customer
            </a>
            ` : ''}
          </div>
        </div>

        <div class="footer">
          This is an automated notification from your MegaCharge EV Platform.<br>
          Verified with 256-bit HMAC-SHA256 signature against Razorpay API.
        </div>
      </div>
    </body>
    </html>
  `;

  // 1. Check if Resend API Key is configured
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'MegaCharge Orders <onboarding@resend.dev>';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [adminEmail],
          subject: `⚡ New Booking Received: ₹${Math.round(amount || 0).toLocaleString('en-IN')} from ${customer.name || 'Customer'} - ${productName || 'Station'}`,
          html: htmlContent,
        }),
      });
      const data = await res.json();
      console.log('Resend email alert sent:', data);
      return { success: true, service: 'resend', data };
    } catch (err) {
      console.error('Failed to send email via Resend:', err);
    }
  }

  // 2. Check if SMTP is configured (Gmail, Google Workspace, Zoho, etc.)
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || 465);

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"MegaCharge Orders" <${smtpUser}>`,
        to: adminEmail,
        subject: `⚡ New Booking Received: ₹${Math.round(amount || 0).toLocaleString('en-IN')} from ${customer.name || 'Customer'} - ${productName || 'Station'}`,
        html: htmlContent,
      });

      console.log('SMTP email alert sent:', info.messageId);
      return { success: true, service: 'smtp', messageId: info.messageId };
    } catch (err) {
      console.error('Failed to send email via SMTP:', err);
    }
  }

  console.warn('Neither RESEND_API_KEY nor SMTP_USER/SMTP_PASS configured in .env. Skipping email alert.');
  return { success: false, reason: 'No email credentials configured' };
}
