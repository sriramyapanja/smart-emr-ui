-- Users table for authentication
-- Run this in your MySQL database: electronic_health_records

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Note: Do NOT insert users directly with plain text passwords!
-- Use the create_default_user.js script to create users with properly hashed passwords:
-- node server/config/create_default_user.js

