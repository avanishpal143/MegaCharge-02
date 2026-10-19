<?php
/**
 * Hostinger PHP API Endpoint: /api/verify-payment
 * Verifies Razorpay payment signature using HMAC SHA256 with Key Secret.
 * Sends email alert via Resend API or SMTP if configured.
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Only POST is accepted.']);
    exit;
}

require_once __DIR__ . '/env_helper.php';

$keySecret = get_config_var('RAZORPAY_KEY_SECRET') ?: get_config_var('RAZORPAY_SECRET_KEY');

if (empty($keySecret)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'RAZORPAY_KEY_SECRET is not configured on the server.'
    ]);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: [];

$razorpayOrderId = $data['razorpay_order_id'] ?? '';
$razorpayPaymentId = $data['razorpay_payment_id'] ?? '';
$razorpaySignature = $data['razorpay_signature'] ?? '';
$amount = $data['amount'] ?? 0;
$productName = $data['productName'] ?? '';
$customer = $data['customer'] ?? [];
$notes = $data['notes'] ?? [];

if (empty($razorpayOrderId) || empty($razorpayPaymentId) || empty($razorpaySignature)) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Missing required fields: razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.'
    ]);
    exit;
}

// Generate expected HMAC-SHA256 signature
$expectedSignature = hash_hmac('sha256', $razorpayOrderId . '|' . $razorpayPaymentId, $keySecret);

$isValid = hash_equals($expectedSignature, $razorpaySignature);

if (!$isValid) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid payment signature. Verification failed.'
    ]);
    exit;
}

// Payment is verified! Send email alert if configured
sendAdminEmailAlert([
    'paymentId' => $razorpayPaymentId,
    'orderId' => $razorpayOrderId,
    'amount' => $amount,
    'productName' => $productName,
    'customer' => $customer,
    'notes' => $notes
]);

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Payment signature verified successfully',
    'paymentId' => $razorpayPaymentId,
    'orderId' => $razorpayOrderId,
    'verifiedAt' => date('c')
]);

/**
 * Sends booking alert email via Resend API or PHP mail()
 */
function sendAdminEmailAlert($params) {
    $adminEmail = get_config_var('ADMIN_ALERT_EMAIL', 'support@megacharge.co.in');
    $resendKey = get_config_var('RESEND_API_KEY');
    $fromEmail = get_config_var('RESEND_FROM_EMAIL', 'MegaCharge Orders <onboarding@resend.dev>');

    $amountFormatted = number_format(round($params['amount'] ?: 0));
    $custName = htmlspecialchars($params['customer']['name'] ?? 'Customer', ENT_QUOTES, 'UTF-8');
    $custPhone = htmlspecialchars($params['customer']['phone'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
    $custEmail = htmlspecialchars($params['customer']['email'] ?? 'Not Provided', ENT_QUOTES, 'UTF-8');
    $cleanPhone = preg_replace('/\D/', '', $custPhone);
    $prodName = htmlspecialchars($params['productName'] ?: 'EV Charging Station', ENT_QUOTES, 'UTF-8');
    $paymentId = htmlspecialchars($params['paymentId'], ENT_QUOTES, 'UTF-8');
    $orderId = htmlspecialchars($params['orderId'], ENT_QUOTES, 'UTF-8');
    $nowFormatted = date('d M Y, h:i A');

    $html = <<<HTML
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
            <div class="amount-value">₹{$amountFormatted}</div>
          </div>
          <table class="details-table">
            <tr><td class="label">Product / Station:</td><td class="val">{$prodName}</td></tr>
            <tr><td class="label">Customer Name:</td><td class="val">{$custName}</td></tr>
            <tr><td class="label">Customer Phone:</td><td class="val">{$custPhone}</td></tr>
            <tr><td class="label">Customer Email:</td><td class="val">{$custEmail}</td></tr>
            <tr><td class="label">Razorpay Payment ID:</td><td class="val" style="font-family: monospace;">{$paymentId}</td></tr>
            <tr><td class="label">Razorpay Order ID:</td><td class="val" style="font-family: monospace;">{$orderId}</td></tr>
            <tr><td class="label">Timestamp:</td><td class="val">{$nowFormatted}</td></tr>
          </table>
          <div class="action-btns">
            <a href="https://wa.me/91{$cleanPhone}?text=Hi%20{$custName},%20we%20have%20received%20your%20payment%20for%20MegaCharge." class="btn btn-wa" target="_blank">WhatsApp Customer</a>
            <a href="tel:{$cleanPhone}" class="btn btn-call">Call Customer</a>
          </div>
        </div>
        <div class="footer">
          Automated notification from your MegaCharge EV Platform (Hostinger).
        </div>
      </div>
    </body>
    </html>
HTML;

    // Option 1: Resend API
    if (!empty($resendKey)) {
        $ch = curl_init('https://api.resend.com/emails');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode([
                'from' => $fromEmail,
                'to' => [$adminEmail],
                'subject' => "⚡ New Booking Received: ₹{$amountFormatted} from {$custName} - {$prodName}",
                'html' => $html
            ]),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $resendKey
            ],
            CURLOPT_TIMEOUT => 15
        ]);
        curl_exec($ch);
        curl_close($ch);
        return;
    }

    // Option 2: Fallback to PHP native mail()
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . $fromEmail,
        'Reply-To: ' . $adminEmail,
        'X-Mailer: PHP/' . phpversion()
    ];
    @mail($adminEmail, "⚡ New Booking Received: ₹{$amountFormatted} from {$custName} - {$prodName}", $html, implode("\r\n", $headers));
}
