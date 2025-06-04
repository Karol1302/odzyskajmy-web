<?php

define('TO_ADDRESS', 'kontakt@odzyskajmy.pl');
define('FROM_ADDRESS', 'admin@odzyskajmy.pl');

$recaptchaSecret = getenv('RECAPTCHA_SECRET');
if (!$recaptchaSecret && file_exists(__DIR__ . '/.env')) {
  foreach (file(__DIR__ . '/.env') as $line) {
    if (strpos($line, 'RECAPTCHA_SECRET=') === 0) {
      $recaptchaSecret = trim(substr($line, strlen('RECAPTCHA_SECRET=')));
      break;
    }
  }
}

if (!$recaptchaSecret) {
  http_response_code(500);
  echo json_encode(['status' => 'error', 'message' => 'Server misconfiguration']);
  exit;
}

header('Content-Type: application/json');

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !is_array($data)) {
  http_response_code(400);
  echo json_encode(['status'=>'error','message'=>'Bad request']);
  exit;
}

if (!empty($data['website'])) {
  echo json_encode(['status'=>'success']);
  exit;
}

$ip = $_SERVER['REMOTE_ADDR'];
$maxRequests = 5;
$period      = 3600;
$rateFile    = sys_get_temp_dir()
               .'/contact_rate_'
               .preg_replace('/[^A-Za-z0-9]/','_',$ip)
               .'.json';

if (file_exists($rateFile)) {
  $times = json_decode(file_get_contents($rateFile), true) ?: [];
} else {
  $times = [];
}
$now   = time();
$times = array_filter($times, fn($t)=> ($now-$t) < $period);
if (count($times) >= $maxRequests) {
  http_response_code(429);
  echo json_encode(['status'=>'error','message'=>'Too many requests']);
  exit;
}
$times[] = $now;
file_put_contents($rateFile, json_encode($times));

$msgRaw = $data['message'] ?? '';
if (preg_match_all('/https?:\/\//i', $msgRaw) > 2) {
  http_response_code(400);
  echo json_encode(['status'=>'error','message'=>'Spam detected']);
  exit;
}
$spamKeywords = [
  'viagra','cialis','casino','free money','click here','earn','loan',
  'credit','bitcoin','crypto','sex','xxx','porn','gambling','winner',
  'outstanding','pre-approved','deal','offer','risk free','cheap meds',
  'darmowy','pożyczka','kredyt','lek na','okazja','oferta specjalna',
  'wygraj','natychmiastowy przelew','super promocja','bez ryzyka',
  'tabletki','biznes w domu','zarób','nagroda','spam','fax','SMS',
];
foreach ($spamKeywords as $kw) {
  if (stripos($msgRaw, $kw) !== false) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>'Spam detected']);
    exit;
  }
}

if (empty($data['recaptchaToken'])) {
  http_response_code(400);
  echo json_encode([
    'status'  => 'error',
    'message' => 'Failed CAPTCHA',
  ]);
  exit;
}

$token  = $data['recaptchaToken'];
  $url    = 'https://www.google.com/recaptcha/api/siteverify';
  $params = [
    'secret'   => $recaptchaSecret,
    'response' => $token,
    'remoteip' => $_SERVER['REMOTE_ADDR'],
  ];

  $ch = curl_init($url);
  // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_TIMEOUT, 5);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
  curl_setopt($ch, CURLOPT_CAINFO, __DIR__ . '/cacert.pem');

  $resp = curl_exec($ch);
  if ($resp === false) {
    $err = curl_error($ch);
    curl_close($ch);
    http_response_code(500);
    echo json_encode([
      'status'  => 'error',
      'message' => 'cURL error',
      // 'error'   => $err,
    ]);
    exit;
  }
  curl_close($ch);

  $r = json_decode($resp, true);
  if (empty($r['success'])) {
    http_response_code(403);
    echo json_encode([
      'status'  => 'error',
      'message' => 'Failed CAPTCHA',
      // 'debug'   => $r,
    ]);
    exit;
  }

$name    = '';
if (!empty($data['firstName']) && !empty($data['lastName'])) {
  $n = $data['firstName'].' '.$data['lastName'];
  $name = filter_var($n, FILTER_SANITIZE_STRING);
} elseif (!empty($data['name'])) {
  $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
}

$email   = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone   = filter_var($data['phone'] ?? '', FILTER_SANITIZE_STRING);
$subject = filter_var($data['subject'] ?? '', FILTER_SANITIZE_STRING) ?: 'Bez tematu';
$message = filter_var($msgRaw, FILTER_SANITIZE_STRING);

if (!$email) {
  http_response_code(400);
  echo json_encode(['status'=>'error','message'=>'Invalid email']);
  exit;
}

$to      = TO_ADDRESS;
$headers  = "From: " . FROM_ADDRESS . "\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$body  = "Imię i nazwisko: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Telefon: {$phone}\n\n";
$body .= "=== Wiadomość ===\n{$message}\n\n";
$body .= "IP: "    .$_SERVER['REMOTE_ADDR']."\n";
$body .= "Agent: " .$_SERVER['HTTP_USER_AGENT']."\n";

if (mail($to, "Formularz: {$subject}", $body, $headers)) {
  echo json_encode(['status'=>'success']);
} else {
  http_response_code(500);
  echo json_encode(['status'=>'error','message'=>'Mail delivery failed']);
}
