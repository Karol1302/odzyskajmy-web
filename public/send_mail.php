<?php
// send_mail.php

// ------------------------
// KONFIGURACJA
// ------------------------
define('TO_ADDRESS', 'kontakt@odzyskajmy.pl');
define('RECAPTCHA_SECRET', '6LfbsycrAAAAACfYpUSK0YxECkIUS-ZQbOj373v2'); // wklej swój sekret z Google

// ------------------------
// NAGŁÓWKI
// ------------------------
header('Content-Type: application/json');

// ------------------------
// 1. ODCZYT REQUESTU
// ------------------------
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !is_array($data)) {
  http_response_code(400);
  echo json_encode(['status'=>'error','message'=>'Bad request']);
  exit;
}

// ------------------------
// 2. HONEYPOT
// ------------------------
if (!empty($data['website'])) {
  // bot — zwracamy sukces, ale nie wysyłamy maila
  echo json_encode(['status'=>'success']);
  exit;
}

// ------------------------
// 3. SPRAWDZENIE reCAPTCHA
// ------------------------
if (!empty($data['recaptchaToken'])) {
  $token = $data['recaptchaToken'];
  $resp  = file_get_contents(
    'https://www.google.com/recaptcha/api/siteverify?secret='
    .urlencode(RECAPTCHA_SECRET)
    .'&response='.urlencode($token)
  );
  $r     = json_decode($resp, true);
  if (empty($r['success']) || ($r['score'] ?? 0) < 0.5) {
    http_response_code(403);
    echo json_encode(['status'=>'error','message'=>'Failed CAPTCHA']);
    exit;
  }
}

// ------------------------
// 4. SANITYZACJA PÓL
// ------------------------
$name    = '';
if (!empty($data['firstName']) && !empty($data['lastName'])) {
  $name = filter_var($data['firstName'].' '.$data['lastName'], FILTER_SANITIZE_STRING);
} elseif (!empty($data['name'])) {
  $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
}

$email   = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone   = filter_var($data['phone'] ?? '', FILTER_SANITIZE_STRING);
$subject = filter_var($data['subject'] ?? '', FILTER_SANITIZE_STRING) ?: 'Bez tematu';
$message = filter_var($data['message'] ?? '', FILTER_SANITIZE_STRING);

// walidacja email
if (!$email) {
  http_response_code(400);
  echo json_encode(['status'=>'error','message'=>'Invalid email']);
  exit;
}

// ------------------------
// 5. BUDOWA MAILA
// ------------------------
$to      = TO_ADDRESS;
$headers  = "From: kontakt@odzyskajmy.pl\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$body  = "Nadawca: {$name}\n";
$body .= "Email: {$email}\n";
if ($phone !== '') {
  $body .= "Telefon: {$phone}\n";
}
$body .= "\n=== Wiadomość ===\n{$message}\n\n";
$body .= "IP: ".$_SERVER['REMOTE_ADDR']."\n";
$body .= "Agent: ".$_SERVER['HTTP_USER_AGENT']."\n";

// ------------------------
// 6. WYSYŁKA
// ------------------------
if (mail($to, "Formularz: {$subject}", $body, $headers)) {
  echo json_encode(['status'=>'success']);
} else {
  http_response_code(500);
  echo json_encode(['status'=>'error','message'=>'Mail delivery failed']);
}
