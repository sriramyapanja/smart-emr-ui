-- Radiology Requests Table
-- Run this in your MySQL database if the table doesn't exist

CREATE TABLE IF NOT EXISTS radiology_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_date DATE NOT NULL,
  laboratory VARCHAR(255) NOT NULL,
  test_type VARCHAR(255) NOT NULL,
  side_left TINYINT(1) DEFAULT 0,
  side_right TINYINT(1) DEFAULT 0,
  region VARCHAR(255),
  other_region VARCHAR(255),
  requests_printed TEXT,
  other_test VARCHAR(255),
  clinical_details TEXT,
  details_form TEXT,
  add_entry TINYINT(1) DEFAULT 0,
  due_date DATE,
  patient_id VARCHAR(50),
  patient_name VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

