<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Content-Type: application/json');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
    exit;
}

$email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$rememberMe = isset($_POST['rememberMe']) ? $_POST['rememberMe'] === 'true' : false;

if (empty($email) || !isValidEmail($email)) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email address'
    ]);
    exit;
}

if (empty($password)) {
    echo json_encode([
        'success' => false,
        'message' => 'Password is required'
    ]);
    exit;
}

$conn = getDBConnection();

$sql = "SELECT id, name, email, password, user_type, created_at FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    $conn->close();
    echo json_encode([
        'success' => false,
        'message' => 'Database error'
    ]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    $stmt->close();
    $conn->close();
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email or password'
    ]);
    exit;
}

$user = $result->fetch_assoc();
$stmt->close();
$conn->close();


if (!password_verify($password, $user['password'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email or password'
    ]);
    exit;
}

$role = ($user['user_type'] === 'buyer') ? 'customer' : $user['user_type'];

$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['name'];
$_SESSION['user_email'] = $user['email'];
$_SESSION['user_role'] = $role;
$_SESSION['login_time'] = time();

if ($rememberMe) {
    $cookieToken = bin2hex(random_bytes(32));

    $_SESSION['remember_token'] = $cookieToken;

    setcookie('rural_market_remember', $cookieToken, time() + (86400 * 30), "/", "", false, true);
}

echo json_encode([
    'success' => true,
    'message' => 'Login successful',
    'user' => [
        'id' => $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'role' => $role
    ],
    'redirect' => getRedirectUrl($role)
]);

function getRedirectUrl($role) {
    switch ($role) {
        case 'admin':
            return 'admin-dashboard.html';
        case 'seller':
            return 'seller-dashboard.html';
        default:
            return 'homepage.html';
    }
}
?>