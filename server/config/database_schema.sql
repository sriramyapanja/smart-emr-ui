-- ============================================================================
-- Smart EMR Database Schema
-- Complete consolidated schema matching the actual database structure
-- Database: electronic_health_records
-- ============================================================================
-- 
-- This schema uses patient_id as the PRIMARY KEY for linking all patient 
-- records across all forms. When the same patient_id is used across different 
-- forms, all records are automatically linked to that patient.
-- ============================================================================

-- ============================================================================
-- 1. PATIENTS TABLE
-- Primary table for storing patient information
-- patient_id is the PRIMARY KEY used to link all other records
-- ============================================================================
CREATE TABLE IF NOT EXISTS patients (
  patient_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  dob DATE NOT NULL,
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(15),
  address TEXT,
  medical_history TEXT,
  allergies TEXT,
  aadhar_number VARCHAR(12),
  emergency_contact VARCHAR(50),
  emergency_phone VARCHAR(15),
  marital_status ENUM('Single', 'Married', 'Divorced', 'Widowed'),
  occupation VARCHAR(50)
);

-- ============================================================================
-- 2. DIAGNOSIS TABLE
-- Stores patient diagnosis records
-- Links to patients via patient_id
-- ============================================================================
CREATE TABLE IF NOT EXISTS diagnosis (
  diagnosis_id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  patient_name VARCHAR(100) NOT NULL,
  diagnosis_date DATE NOT NULL,
  symptoms TEXT,
  observations TEXT,
  provisional_diagnosis TEXT,
  tests TEXT,
  final_diagnosis TEXT NOT NULL,
  treatment_plan TEXT NOT NULL,
  follow_up TEXT,
  INDEX idx_patient_id (patient_id)
);

-- ============================================================================
-- 3. TREATMENT TABLE
-- Stores patient treatment records
-- Links to patients via patient_id
-- ============================================================================
CREATE TABLE IF NOT EXISTS treatment (
  treatment_id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  patient_name VARCHAR(100) NOT NULL,
  treatment_date DATE NOT NULL,
  diagnosis TEXT,
  medications TEXT,
  procedures TEXT,
  therapy_plan TEXT,
  diet TEXT,
  lifestyle TEXT,
  follow_up TEXT,
  additional_notes TEXT,
  INDEX idx_patient_id (patient_id)
);

-- ============================================================================
-- 4. MEDICAL HISTORY TABLE
-- Stores comprehensive medical history for patients
-- Links to patients via patient_id
-- ============================================================================
CREATE TABLE IF NOT EXISTS medical_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id VARCHAR(50),
  patient_name VARCHAR(200) NOT NULL,
  chronic_illnesses TEXT NOT NULL,
  surgeries TEXT,
  current_medications TEXT,
  allergies TEXT,
  hospitalizations TEXT,
  family_history TEXT,
  immunizations TEXT,
  social_history TEXT,
  other_conditions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================================
-- 5. LAB REPORTS TABLE
-- Stores laboratory test results
-- Links to patients via patient_id
-- ============================================================================
CREATE TABLE IF NOT EXISTS lab_reports (
  report_id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  patient_name VARCHAR(100) NOT NULL,
  test_date DATE NOT NULL,
  physician VARCHAR(100),
  hemoglobin DECIMAL(5,2),
  rbc DECIMAL(5,2),
  wbc DECIMAL(7,2),
  platelets INT,
  glucose DECIMAL(6,2),
  urea DECIMAL(6,2),
  creatinine DECIMAL(6,2),
  cholesterol DECIMAL(6,2),
  microbiology_findings TEXT,
  xray TEXT,
  ct_scan TEXT,
  mri TEXT,
  ultrasound TEXT,
  other_tests TEXT,
  INDEX idx_patient_id (patient_id)
);

-- ============================================================================
-- 6. APPOINTMENTS TABLE
-- Stores appointment scheduling information
-- Links to patients via patient_id
-- ============================================================================
CREATE TABLE IF NOT EXISTS appointments (
  appointment_id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  patient_name VARCHAR(100) NOT NULL,
  patient_email VARCHAR(100) NOT NULL,
  doctor_name VARCHAR(100) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_patient_id (patient_id)
);

-- ============================================================================
-- 7. RADIOLOGY REQUESTS TABLE
-- Stores radiology imaging requests
-- Links to patients via patient_id
-- ============================================================================
CREATE TABLE IF NOT EXISTS radiology_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT,
  patient_name VARCHAR(200),
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 8. PATHOLOGY REQUESTS TABLE
-- Stores pathology test requests
-- Links to patients via patient_id
-- ============================================================================
CREATE TABLE IF NOT EXISTS pathology_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id VARCHAR(50),
  patient_name VARCHAR(200),
  doctor_name VARCHAR(200),
  test_date DATE,
  request_date DATE,
  lab VARCHAR(100),
  favourite_tests TEXT,
  test_list TEXT,
  clinical_details TEXT,
  last_cytology TINYINT(1) DEFAULT 0,
  cytology_date DATE,
  hpv_not_required TINYINT(1) DEFAULT 0,
  hpv_reason VARCHAR(255),
  pregnancy_status VARCHAR(50),
  contraception_method VARCHAR(50),
  abnormal_bleeding VARCHAR(10),
  clinical_notes TEXT,
  copy_to VARCHAR(255),
  collection_by TEXT,
  fasting_status VARCHAR(50),
  billing_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 9. USERS TABLE
-- Stores user authentication information
-- Used for login and access control
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- NOTES:
-- 
-- 1. PRIMARY KEY LINKING:
--    - All tables use patient_id to link records to patients
--    - When the same patient_id is used across different forms, all records 
--      are automatically linked to that patient
--    - Use GET /api/patients/:id/records to retrieve all linked records
--
-- 2. USER CREATION:
--    - Do NOT insert users directly with plain text passwords!
--    - Use the create_default_user.js script to create users with properly 
--      hashed passwords: node server/config/create_default_user.js
--
-- 3. TABLE NAMING:
--    - Some tables use singular names (patients, users)
--    - Some tables use plural names (appointments, lab_reports)
--    - This matches the actual database structure
-- ============================================================================

