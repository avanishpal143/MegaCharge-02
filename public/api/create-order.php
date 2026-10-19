<?php
/**
 * Hostinger PHP API Endpoint: /api/create-order
 * Creates an order directly with Razorpay API using Key ID and Key Secret.
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

$keyId = get_config_var('VITE_RAZORPAY_KEY_ID') ?: get_config_var('RAZORPAY_KEY_ID') ?: get_config_var('RAZORPAY_API_KEY');
$keySecret = get_config_var('RAZORPAY_KEY_SECRET') ?: get_config_var('RAZORPAY_SECRET_KEY');

if (empty($keyId) || empty($keySecret)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Razorpay credentials (VITE_RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET) are missing on the server.'
    ]);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: [];

$amount = isset($data['amount']) ? (float)$data['amount'] : 0;
$currency = !empty($data['currency']) ? $data['currency'] : 'INR';
$receipt = !empty($data['receipt']) ? $data['receipt'] : 'rcpt_' . round(microtime(true) * 1000);
$notes = isset($data['notes']) && is_array($data['notes']) ? $data['notes'] : [];

if ($amount <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid amount. Amount must be a positive number in paise.']);
    exit;
}

$postData = [
    'amount' => (int)round($amount),
    'currency' => $currency,
    'receipt' => (string)$receipt,
    'notes' => $notes
];

$ch = curl_init('https://api.razorpay.com/v1/orders');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($postData),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Basic ' . base64_encode($keyId . ':' . $keySecret)
    ],
    CURLOPT_TIMEOUT => 20
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL error connecting to Razorpay: ' . $curlError]);
    exit;
}

http_response_code($httpCode ?: 200);
echo $response;
