/**
 * Vercel Serverless Function: /api/contact
 * Handles contact & rental enquiry submissions and sends alert email to admin.
 */

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST accepted.' });
  }

  try {
    const { name, phone, email, location, message } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone number are required.' });
    }

    const adminEmail = process.env.ADMIN_ALERT_EMAIL || 'support@megacharge.co.in';

    // If Resend API key is configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'MegaCharge Leads <onboarding@resend.dev>',
            to: [adminEmail],
            subject: `⚡ New MegaCharge Lead: ${name} (${phone})`,
            html: `
              <h2>New Charger Installation / Rental Inquiry</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>Email:</strong> ${email || 'Not provided'}</p>
              <p><strong>Location:</strong> ${location || 'Not provided'}</p>
              <p><strong>Message:</strong><br>${message || 'No additional message'}</p>
              <hr/>
              <p><small>Submitted via MegaCharge Official Website</small></p>
            `
          })
        });
      } catch (mailErr) {
        console.error('Failed to send email via Resend:', mailErr);
      }
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '465', 10),
          secure: process.env.SMTP_PORT !== '587',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: `"MegaCharge Leads" <${process.env.SMTP_USER}>`,
          to: adminEmail,
          subject: `⚡ New MegaCharge Lead: ${name} (${phone})`,
          text: `New Lead Details:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nLocation: ${location}\nMessage: ${message}`
        });
      } catch (smtpErr) {
        console.error('Failed to send email via SMTP:', smtpErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully. A representative will contact you soon.'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ error: 'Server error while processing request.' });
  }
}
