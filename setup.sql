CREATE DATABASE IF NOT EXISTS rural_market CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE rural_market;
CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('buyer', 'seller', 'admin') NOT NULL DEFAULT 'buyer',
    is_active TINYINT(1) DEFAULT 1,
    email_verified TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_user_type (user_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO users (name, email, phone, password, user_type, email_verified) 
VALUES (
    'System Admin', 
    'admin@ruralmarket.com', 
    '+8801700000000', 
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
    'admin', 
    1
) ON DUPLICATE KEY UPDATE email=email;

-- Insert sample seller (password: Seller@123)
INSERT INTO users (name, email, phone, password, user_type, email_verified) 
VALUES (
    'Sample Seller', 
    'seller@example.com', 
    '+8801711111111', 
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
    'seller', 
    1
) ON DUPLICATE KEY UPDATE email=email;

-- Insert sample buyer (password: Buyer@123)
INSERT INTO users (name, email, phone, password, user_type, email_verified) 
VALUES (
    'Sample Buyer', 
    'buyer@example.com', 
    '+8801722222222', 
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
    'buyer', 
    1
) ON DUPLICATE KEY UPDATE email=email;

-- Create a table for login sessions (optional, for enhanced security)
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    session_token VARCHAR(64) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Display success message
SELECT 'Database setup completed successfully!' AS message;