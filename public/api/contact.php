<?php
/**
 * Hostinger / cPanel PHP Endpoint: /api/contact.php
 * Handles contact & rental enquiry submissions and sends email alert.
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods', 'POST, OPTIONS');
header('Access-Control-Allow-Headers', 'Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Only POST accepted.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = trim($input['name'] ?? '');
$phone = trim($input['phone'] ?? '');
$email = trim($input['email'] ?? '');
$location = trim($input['location'] ?? '');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and phone number are required.']);
    exit();
}

// Read ADMIN_ALERT_EMAIL from env or fallback
$adminEmail = 'support@megacharge.co.in';
if (file_exists(__DIR__ . '/env_helper.php')) {
    require_once __DIR__ . '/env_helper.php';
    if (function_exists('get_config_var')) {
        $adminEmail = get_config_var('ADMIN_ALERT_EMAIL', 'support@megacharge.co.in');
    }
}

// Send email using PHP mail()
$subject = "⚡ New MegaCharge Lead: " . $name . " (" . $phone . ")";
$body = "New Charger Rental / Installation Inquiry:\n\n" .
        "Name: " . $name . "\n" .
        "Phone: " . $phone . "\n" .
        "Email: " . ($email ?: 'Not provided') . "\n" .
        "Location: " . ($location ?: 'Not provided') . "\n" .
        "Message:\n" . ($message ?: 'No message') . "\n\n" .
        "Received on: " . date('Y-m-d H:i:s') . "\n";

$headers = "From: MegaCharge Leads <no-reply@megacharge.co.in>\r\n" .
           "Reply-To: " . ($email ?: $adminEmail) . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

@mail($adminEmail, $subject, $body, $headers);

echo json_encode([
    'success' => true,
    'message' => 'Your inquiry has been submitted successfully.'
]);
