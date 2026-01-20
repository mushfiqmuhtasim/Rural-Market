<?php
session_start();
$_SESSION = array();

if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}
if (isset($_COOKIE['rural_market_remember'])) {
    setcookie('rural_market_remember', '', time() - 3600, '/');
}

session_destroy();

header('Content-Type: application/json');

echo json_encode([
    'success' => true,
    'message' => 'Logged out successfully'
]);
?>