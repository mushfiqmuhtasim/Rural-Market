<?php

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

// Get POST data
$fullName = isset($_POST['fullName']) ? sanitizeInput($_POST['fullName']) : '';
$email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
$phone = isset($_POST['phone']) ? sanitizeInput($_POST['phone']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$role = isset($_POST['role']) ? sanitizeInput($_POST['role']) : '';

$errors = [];

if (empty($fullName)) {
    $errors[] = 'Full name is required';
} elseif (strlen($fullName) < 3) {
    $errors[] = 'Full name must be at least 3 characters';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!isValidEmail($email)) {
    $errors[] = 'Invalid email format';
}

if (empty($phone)) {
    $errors[] = 'Phone number is required';
} elseif (!isValidPhone($phone)) {
    $errors[] = 'Invalid phone number format';
}

if (empty($password)) {
    $errors[] = 'Password is required';
} elseif (strlen($password) < 8) {
    $errors[] = 'Password must be at least 8 characters';
}

$validRoles = ['customer', 'seller', 'admin'];
if (empty($role)) {
    $errors[] = 'User role is required';
} elseif (!in_array($role, $validRoles)) {
    $errors[] = 'Invalid user role';
}

$userType = ($role === 'customer') ? 'buyer' : $role;

if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $errors
    ]);
    exit;
}

$conn = getDBConnection();

$checkEmailSql = "SELECT id FROM users WHERE email = ?";
$stmt = $conn->prepare($checkEmailSql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->close();
    $conn->close();
    echo json_encode([
        'success' => false,
        'message' => 'Email already registered'
    ]);
    exit;
}
$stmt->close();

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

$insertSql = "INSERT INTO users (name, email, phone, password, user_type) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($insertSql);

if (!$stmt) {
    $conn->close();
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $conn->error
    ]);
    exit;
}

$stmt->bind_param("sssss", $fullName, $email, $phone, $hashedPassword, $userType);

if ($stmt->execute()) {
    $userId = $stmt->insert_id;
    
    $stmt->close();
    $conn->close();
    
    echo json_encode([
        'success' => true,
        'message' => 'Account created successfully',
        'user' => [
            'id' => $userId,
            'name' => $fullName,
            'email' => $email,
            'role' => $role
        ]
    ]);
} else {
    $stmt->close();
    $conn->close();
    
    echo json_encode([
        'success' => false,
        'message' => 'Failed to create account: ' . $stmt->error
    ]);
}
?>