<?php
// Admin API - Backend for Admin Dashboard
include 'config.php';
include 'dbconnect.php';

header('Content-Type: application/json');

$action = isset($_GET['action']) ? sanitizeInput($_GET['action']) : '';

$response = [
    'success' => false,
    'message' => 'Invalid action'
];

// Check if user is admin (Add your authentication logic here)
// This is a placeholder - implement proper admin authentication

switch($action) {
    
    case 'getDashboardStats':
        $response = getDashboardStats();
        break;
        
    case 'getRecentOrders':
        $response = getRecentOrders();
        break;
        
    case 'getNewUsers':
        $response = getNewUsers();
        break;
        
    case 'getAllUsers':
        $response = getAllUsers();
        break;
        
    case 'getAllSellers':
        $response = getAllSellers();
        break;
        
    case 'getAllProducts':
        $response = getAllProducts();
        break;
        
    case 'getAllOrders':
        $response = getAllOrders();
        break;
        
    case 'getAllCategories':
        $response = getAllCategories();
        break;
        
    case 'getUser':
        $response = getUser($_GET['id'] ?? 0);
        break;
        
    case 'updateUser':
        $response = updateUser($_POST);
        break;
        
    case 'deleteUser':
        $response = deleteUser($_GET['id'] ?? 0);
        break;
        
    case 'approveSeller':
        $response = approveSeller($_GET['id'] ?? 0);
        break;
        
    case 'rejectSeller':
        $response = rejectSeller($_GET['id'] ?? 0);
        break;
        
    case 'updateOrderStatus':
        $response = updateOrderStatus($_POST);
        break;
        
    default:
        $response = [
            'success' => false,
            'message' => 'Unknown action'
        ];
}

echo json_encode($response);

// Functions to get dashboard stats
function getDashboardStats() {
    $conn = getDBConnection();
    
    // Get total users
    $totalUsers = $conn->query("SELECT COUNT(*) as count FROM users")->fetch_assoc()['count'];
    
    // Get total sellers
    $totalSellers = $conn->query("SELECT COUNT(*) as count FROM sellers WHERE status='active'")->fetch_assoc()['count'];
    
    // Get total products
    $totalProducts = $conn->query("SELECT COUNT(*) as count FROM products")->fetch_assoc()['count'];
    
    // Get total orders
    $totalOrders = $conn->query("SELECT COUNT(*) as count FROM orders")->fetch_assoc()['count'];
    
    // Get pending orders
    $pendingOrders = $conn->query("SELECT COUNT(*) as count FROM orders WHERE status='pending'")->fetch_assoc()['count'];
    
    // Get total revenue
    $totalRevenue = $conn->query("SELECT SUM(total_amount) as revenue FROM orders WHERE status='delivered'")->fetch_assoc()['revenue'];
    
    $conn->close();
    
    return [
        'success' => true,
        'data' => [
            'totalUsers' => $totalUsers,
            'totalSellers' => $totalSellers,
            'totalProducts' => $totalProducts,
            'totalOrders' => $totalOrders,
            'pendingOrders' => $pendingOrders,
            'totalRevenue' => $totalRevenue ? '৳ ' . number_format($totalRevenue) : '০'
        ]
    ];
}

function getRecentOrders() {
    $conn = getDBConnection();
    
    $result = $conn->query("
        SELECT o.order_id, o.customer_id, o.seller_id, o.total_amount, o.status, o.order_date,
               u.full_name as customer_name, s.business_name
        FROM orders o
        JOIN users u ON o.customer_id = u.user_id
        JOIN sellers s ON o.seller_id = s.seller_id
        ORDER BY o.order_date DESC
        LIMIT 5
    ");
    
    $orders = [];
    while($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
    
    $conn->close();
    
    return [
        'success' => true,
        'data' => $orders
    ];
}

function getNewUsers() {
    $conn = getDBConnection();
    
    $result = $conn->query("
        SELECT user_id, full_name, email, role, created_at
        FROM users
        ORDER BY created_at DESC
        LIMIT 5
    ");
    
    $users = [];
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    
    $conn->close();
    
    return [
        'success' => true,
        'data' => $users
    ];
}

function getAllUsers() {
    $conn = getDBConnection();
    
    $result = $conn->query("
        SELECT user_id, full_name, email, phone, role, status
        FROM users
        ORDER BY created_at DESC
    ");
    
    $users = [];
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    
    $conn->close();
    
    return [
        'success' => true,
        'data' => $users
    ];
}

function getAllSellers() {
    $conn = getDBConnection();
    
    $result = $conn->query("
        SELECT s.seller_id, s.business_name, s.owner_name, s.email, 
               COUNT(p.product_id) as product_count, s.rating, s.status
        FROM sellers s
        LEFT JOIN products p ON s.seller_id = p.seller_id
        GROUP BY s.seller_id
        ORDER BY s.created_at DESC
    ");
    
    $sellers = [];
    while($row = $result->fetch_assoc()) {
        $sellers[] = $row;
    }
    
    $conn->close();
    
    return [
        'success' => true,
        'data' => $sellers
    ];
}

function getAllProducts() {
    $conn = getDBConnection();
    
    $result = $conn->query("
        SELECT p.product_id, p.product_name, s.business_name, p.category, 
               p.price, p.stock_quantity, p.status
        FROM products p
        JOIN sellers s ON p.seller_id = s.seller_id
        ORDER BY p.created_at DESC
    ");
    
    $products = [];
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    
    $conn->close();
    
    return [
        'success' => true,
        'data' => $products
    ];
}

function getAllOrders() {
    $conn = getDBConnection();
    
    $result = $conn->query("
        SELECT o.order_id, o.customer_id, o.seller_id, o.total_amount, o.status, 
               o.payment_status, o.order_date, u.full_name, s.business_name
        FROM orders o
        JOIN users u ON o.customer_id = u.user_id
        JOIN sellers s ON o.seller_id = s.seller_id
        ORDER BY o.order_date DESC
    ");
    
    $orders = [];
    while($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
    
    $conn->close();
    
    return [
        'success' => true,
        'data' => $orders
    ];
}

function getAllCategories() {
    $conn = getDBConnection();
    
    $result = $conn->query("
        SELECT c.category_id, c.category_name, c.description, c.status,
               COUNT(p.product_id) as product_count
        FROM categories c
        LEFT JOIN products p ON c.category_id = p.category_id
        GROUP BY c.category_id
        ORDER BY c.category_name
    ");
    
    $categories = [];
    while($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
    
    $conn->close();
    
    return [
        'success' => true,
        'data' => $categories
    ];
}

function getUser($userId) {
    $conn = getDBConnection();
    
    $userId = intval($userId);
    $result = $conn->query("SELECT * FROM users WHERE user_id = $userId");
    
    if($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $conn->close();
        return [
            'success' => true,
            'data' => $user
        ];
    }
    
    $conn->close();
    return [
        'success' => false,
        'message' => 'User not found'
    ];
}

function updateUser($data) {
    $conn = getDBConnection();
    
    $userId = intval($data['user_id'] ?? 0);
    $fullName = sanitizeInput($data['full_name'] ?? '');
    $email = sanitizeInput($data['email'] ?? '');
    $status = sanitizeInput($data['status'] ?? 'active');
    
    $query = "UPDATE users SET full_name='$fullName', email='$email', status='$status' WHERE user_id=$userId";
    
    if($conn->query($query)) {
        $conn->close();
        return [
            'success' => true,
            'message' => 'User updated successfully'
        ];
    }
    
    $conn->close();
    return [
        'success' => false,
        'message' => 'Error updating user'
    ];
}

function deleteUser($userId) {
    $conn = getDBConnection();
    
    $userId = intval($userId);
    
    if($conn->query("DELETE FROM users WHERE user_id=$userId")) {
        $conn->close();
        return [
            'success' => true,
            'message' => 'User deleted successfully'
        ];
    }
    
    $conn->close();
    return [
        'success' => false,
        'message' => 'Error deleting user'
    ];
}

function approveSeller($sellerId) {
    $conn = getDBConnection();
    
    $sellerId = intval($sellerId);
    
    if($conn->query("UPDATE sellers SET status='active' WHERE seller_id=$sellerId")) {
        $conn->close();
        return [
            'success' => true,
            'message' => 'Seller approved successfully'
        ];
    }
    
    $conn->close();
    return [
        'success' => false,
        'message' => 'Error approving seller'
    ];
}

function rejectSeller($sellerId) {
    $conn = getDBConnection();
    
    $sellerId = intval($sellerId);
    
    if($conn->query("UPDATE sellers SET status='rejected' WHERE seller_id=$sellerId")) {
        $conn->close();
        return [
            'success' => true,
            'message' => 'Seller rejected successfully'
        ];
    }
    
    $conn->close();
    return [
        'success' => false,
        'message' => 'Error rejecting seller'
    ];
}

function updateOrderStatus($data) {
    $conn = getDBConnection();
    
    $orderId = intval($data['order_id'] ?? 0);
    $status = sanitizeInput($data['status'] ?? '');
    
    $query = "UPDATE orders SET status='$status' WHERE order_id=$orderId";
    
    if($conn->query($query)) {
        $conn->close();
        return [
            'success' => true,
            'message' => 'Order status updated successfully'
        ];
    }
    
    $conn->close();
    return [
        'success' => false,
        'message' => 'Error updating order status'
    ];
}
?>
