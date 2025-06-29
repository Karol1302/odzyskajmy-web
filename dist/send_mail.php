<?php
ini_set('display_errors', 0);              // strona ma zwracać 500, nie HTML z trace’em
ini_set('log_errors',     1);
ini_set('error_log', __DIR__ . '/php-error.log');
error_reporting(E_ALL);
/* ==================================================
 * 0.  Ładowanie PHPMailera (bez Composer) + helper env()
 * =================================================*/
require_once __DIR__ . '/PHPMailer/src/Exception.php';
require_once __DIR__ . '/PHPMailer/src/SMTP.php';
require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


/** env() – pobiera zmienne z .env, $_ENV i $_SERVER          */
function env(string $key, $default = null) {
    static $cache = null;
    if ($cache === null && file_exists(__DIR__.'/.env')) {
        // INI_SCANNER_RAW: nie ucina znaku #
        $cache = parse_ini_file(__DIR__.'/.env', false, INI_SCANNER_RAW);
    }
    return $_ENV[$key] ?? $_SERVER[$key] ?? $cache[$key] ?? $default;
}

/* ==================================================
 * 1.  Konfiguracja z .env (domyślne wartości awaryjne)
 * =================================================*/
$recaptchaSecret = env('RECAPTCHA_SECRET');                 // MUSI być
$smtpHost   = env('SMTP_HOST',   'smtp.dpoczta.pl');
$smtpPort   = (int)env('SMTP_PORT', 587);                   // STARTTLS
$smtpUser   = env('SMTP_USER',   'kontakt@odzyskajmy.pl');
$smtpPass   = env('SMTP_PASS');                             // MUSI być
$smtpSecure = env('SMTP_SECURE', 'tls');                    // 'tls' = STARTTLS
$mailFrom   = env('MAIL_FROM',   'kontakt@odzyskajmy.pl');
$mailTo     = env('MAIL_TO',     'kontakt@odzyskajmy.pl');

/* brak klucza recaptcha ⇒ błąd konfiguracyjny */
if (!$recaptchaSecret || !$smtpPass) {
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>'Server misconfiguration']);
    exit;
}

/* ==================================================
 * 2.  Pobranie danych POST + honeypot
 * =================================================*/
header('Content-Type: application/json');
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>'Bad request']);
    exit;
}

/* honeypot – pole „website” ma pozostać puste */
if (!empty($data['website'])) {
    echo json_encode(['status'=>'success']);
    exit;
}

/* ==================================================
 * 3.  Rate-limit (5 żądań / 3600 s) na IP
 * =================================================*/
$ip   = $_SERVER['REMOTE_ADDR'];
$max  = 5;
$span = 3600;
$f    = sys_get_temp_dir().'/contact_rate_'.preg_replace('/\W/','_',$ip).'.json';

$times = file_exists($f) ? (json_decode(file_get_contents($f),true) ?: []) : [];
$now   = time();
$times = array_filter($times, fn($t)=> ($now-$t)<$span);

if (count($times) >= $max) {
    http_response_code(429);
    echo json_encode(['status'=>'error','message'=>'Too many requests']);
    exit;
}
$times[] = $now;
file_put_contents($f, json_encode($times));

/* ==================================================
 * 4.  Spam-filtry (linki + czarna lista słów)
 * =================================================*/
$msgRaw = $data['message'] ?? '';
if (preg_match_all('/https?:\/\//i', $msgRaw) > 2) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>'Spam detected']);
    exit;
}

$spam = [
  'viagra','cialis','casino','free money','click here','earn','loan',
  'credit','bitcoin','crypto','sex','xxx','porn','gambling','winner',
  'outstanding','pre-approved','deal','offer','risk free','cheap meds',
  'darmowy','pożyczka','kredyt','lek na','okazja','oferta specjalna',
  'wygraj','natychmiastowy przelew','super promocja','bez ryzyka',
  'tabletki','biznes w domu','zarób','nagroda','spam','fax','SMS',
];
foreach ($spam as $kw) {
    if (stripos($msgRaw, $kw) !== false) {
        http_response_code(400);
        echo json_encode(['status'=>'error','message'=>'Spam detected']);
        exit;
    }
}

/* ==================================================
 * 5.  Weryfikacja reCAPTCHA
 * =================================================*/
if (empty($data['recaptchaToken'])) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>'Failed CAPTCHA']);
    exit;
}

$verify = [
    'secret'   => $recaptchaSecret,
    'response' => $data['recaptchaToken'],
    'remoteip' => $_SERVER['REMOTE_ADDR'],
];

$ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 5,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $verify,
    CURLOPT_CAINFO         => __DIR__.'/cacert.pem',
]);
$resp = curl_exec($ch); curl_close($ch);
if (!$resp || empty(json_decode($resp, true)['success'])) {
    http_response_code(403);
    echo json_encode(['status'=>'error','message'=>'Failed CAPTCHA']);
    exit;
}

/* ==================================================
 * 6.  Walidacja i sanizacja pól formularza
 * =================================================*/
$name='';
if (!empty($data['firstName']) && !empty($data['lastName'])) {
    $name = filter_var($data['firstName'].' '.$data['lastName'], FILTER_SANITIZE_STRING);
} elseif (!empty($data['name'])) {
    $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
}
$email   = filter_var($data['email']  ?? '', FILTER_VALIDATE_EMAIL);
$phone   = filter_var($data['phone']  ?? '', FILTER_SANITIZE_STRING);
$subject = filter_var($data['subject']?? '', FILTER_SANITIZE_STRING) ?: 'Bez tematu';
$message = filter_var($msgRaw,          FILTER_SANITIZE_STRING);

if (!$email) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>'Invalid email']);
    exit;
}

/* ==================================================
 * 7.  Treść wiadomości
 * =================================================*/
$body  = "Imię i nazwisko: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Telefon: {$phone}\n\n";
$body .= "=== Wiadomość ===\n{$message}\n\n";
$body .= "IP: ".$_SERVER['REMOTE_ADDR']."\n";
$body .= "Agent: ".$_SERVER['HTTP_USER_AGENT']."\n";

/* ==================================================
 * 8.  Wysyłka przez PHPMailer + SMTP
 * =================================================*/
try {
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->Port       = $smtpPort;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPass;
    $mail->SMTPSecure = $smtpSecure;      // 'tls' => STARTTLS

    /* log rozmowy SMTP → smtp.log */
    $mail->SMTPDebug  = 2;                // 0 = wyłącz
    $mail->Debugoutput = fn($s,$l)=>
        file_put_contents(__DIR__.'/smtp.log',
            date('c')." [$l] $s\n", FILE_APPEND);

    /* adresaci */
    $mail->setFrom($mailFrom, 'Formularz www');
    $mail->addAddress($mailTo);
    $mail->addReplyTo($email, $name ?: $email);

    /* temat + treść */
    $mail->Subject = "Formularz: {$subject}";
    $mail->Body    = $body;

    $mail->send();
    echo json_encode(['status'=>'success']);
} catch (Exception $e) {
    error_log('Mail error: '.$mail->ErrorInfo);
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Mail delivery failed: '.$mail->ErrorInfo,
    ]);
}
