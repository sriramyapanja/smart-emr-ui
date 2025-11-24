-- Smart EMR Database Schema

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  dob DATE NOT NULL,
  gender VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Diagnosis table
CREATE TABLE IF NOT EXISTS diagnosis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id VARCHAR(50),
  patient_name VARCHAR(200),
  date DATE NOT NULL,
  symptoms TEXT,
  observations TEXT,
  provisional_diagnosis TEXT,
  tests TEXT,
  final_diagnosis TEXT NOT NULL,
  treatment_plan TEXT NOT NULL,
  follow_up TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Treatment table
CREATE TABLE IF NOT EXISTS treatment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id VARCHAR(50),
  patient_name VARCHAR(200),
  date DATE NOT NULL,
  diagnosis TEXT NOT NULL,
  medications TEXT NOT NULL,
  procedures TEXT,
  therapy_plan TEXT,
  diet TEXT,
  lifestyle TEXT,
  follow_up TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medical History table
CREATE TABLE IF NOT EXISTS medical_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id VARCHAR(50),
  patient_name VARCHAR(200),
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

-- Lab Report table
CREATE TABLE IF NOT EXISTS lab_report (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id VARCHAR(50),
  patient_name VARCHAR(200),
  date DATE NOT NULL,
  physician VARCHAR(200),
  hemoglobin VARCHAR(50),
  rbc VARCHAR(50),
  wbc VARCHAR(50),
  glucose VARCHAR(50),
  cholesterol VARCHAR(50),
  microbiology_findings TEXT,
  xray TEXT,
  ct_scan TEXT,
  mri TEXT,
  ultrasound TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointment table
CREATE TABLE IF NOT EXISTS appointment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_name VARCHAR(200) NOT NULL,
  patient_email VARCHAR(255) NOT NULL,
  doctor_name VARCHAR(200) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

