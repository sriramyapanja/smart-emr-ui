import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Create a new patient
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, dob, gender, email, phone } = req.body;

    if (!first_name || !last_name || !dob || !gender) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await pool.execute(
      'INSERT INTO patients (first_name, last_name, dob, gender, email, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [first_name, last_name, dob, gender, email || null, phone || null]
    );

    res.status(201).json({
      message: 'Patient created successfully',
      patientId: result.insertId
    });
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Failed to create patient', details: error.message });
  }
});

// Get all patients
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM patients ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients', details: error.message });
  }
});

// Search patients
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchTerm = `%${query}%`;
    let sql = `SELECT * FROM patients 
               WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ?`;
    let params = [searchTerm, searchTerm, searchTerm, searchTerm];
    
    // If query is numeric, also search by patient_id
    const numericId = parseInt(query, 10);
    if (!isNaN(numericId)) {
      sql += ` OR patient_id = ?`;
      params.push(numericId);
    }
    
    sql += ` ORDER BY last_name, first_name`;
    
    const [rows] = await pool.execute(sql, params);
    // Map patient_id to id for frontend compatibility
    const mappedRows = rows.map(row => {
      row.id = row.patient_id;
      return row;
    });
    res.json(mappedRows);
  } catch (error) {
    console.error('Error searching patients:', error);
    res.status(500).json({ error: 'Failed to search patients', details: error.message });
  }
});

// Get patient by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM patients WHERE patient_id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    // Map patient_id to id for frontend compatibility
    const patient = rows[0];
    patient.id = patient.patient_id;
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Failed to fetch patient', details: error.message });
  }
});

// Get all records for a patient
// This endpoint retrieves ALL records linked to a patient using patient_id as the PRIMARY KEY
// When the same patient_id is used across different forms (Diagnosis, Treatment, Pathology, etc.),
// all those records will be linked and retrieved together
router.get('/:id/records', async (req, res) => {
  try {
    const patientId = req.params.id;
    const { startDate, endDate } = req.query;

    // Get patient info
    const [patient] = await pool.execute('SELECT * FROM patients WHERE patient_id = ?', [patientId]);
    if (patient.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patientName = `%${patient[0].first_name}% ${patient[0].last_name}%`;
    const patientEmail = patient[0].email || '';

    // Build queries - PRIMARY KEY: patient_id
    // All forms should save patient_id to link records to the same patient
    // When retrieving by patient_id, we get ALL records from ALL forms for that patient
    let diagnosisQuery = 'SELECT * FROM diagnosis WHERE patient_id = ?';
    let diagnosisParams = [patientId];
    
    let treatmentQuery = 'SELECT * FROM treatment WHERE patient_id = ?';
    let treatmentParams = [patientId];
    
    let labReportsQuery = 'SELECT * FROM lab_report WHERE patient_id = ?';
    let labReportsParams = [patientId];
    
    let radiologyQuery = 'SELECT * FROM radiology_requests WHERE patient_id = ?';
    let radiologyParams = [patientId];
    
    let pathologyQuery = 'SELECT * FROM pathology_requests WHERE patient_id = ?';
    let pathologyParams = [patientId];
    
    // Medical history - also check by patient_id
    let medicalHistoryQuery = 'SELECT * FROM medical_history WHERE patient_id = ?';
    let medicalHistoryParams = [patientId];
    
    // Appointments - match by email (most reliable) or name
    let appointmentsQuery = 'SELECT * FROM appointment WHERE patient_email = ? OR (patient_name LIKE ?)';
    let appointmentsParams = [patientEmail, patientName];

    if (startDate && endDate) {
      diagnosisQuery += ' AND diagnosis_date >= ? AND diagnosis_date <= ?';
      diagnosisParams.push(startDate, endDate);
      
      treatmentQuery += ' AND treatment_date >= ? AND treatment_date <= ?';
      treatmentParams.push(startDate, endDate);
      
      labReportsQuery += ' AND date >= ? AND date <= ?';
      labReportsParams.push(startDate, endDate);
      
      radiologyQuery += ' AND request_date >= ? AND request_date <= ?';
      radiologyParams.push(startDate, endDate);
      
      pathologyQuery += ' AND request_date >= ? AND request_date <= ?';
      pathologyParams.push(startDate, endDate);
      
      appointmentsQuery += ' AND appointment_date >= ? AND appointment_date <= ?';
      appointmentsParams.push(startDate, endDate);
    }

    diagnosisQuery += ' ORDER BY diagnosis_date DESC';
    treatmentQuery += ' ORDER BY treatment_date DESC';
    labReportsQuery += ' ORDER BY date DESC';
    radiologyQuery += ' ORDER BY request_date DESC';
    pathologyQuery += ' ORDER BY request_date DESC';
    appointmentsQuery += ' ORDER BY appointment_date DESC';

    // Get all records - using patient_id as PRIMARY KEY to link all records
    const [diagnosis] = await pool.execute(diagnosisQuery, diagnosisParams);
    const [treatment] = await pool.execute(treatmentQuery, treatmentParams);
    const [medicalHistory] = await pool.execute(medicalHistoryQuery, medicalHistoryParams);
    
    // Try to get lab reports, but handle if table doesn't exist
    let labReports = [];
    try {
      [labReports] = await pool.execute(labReportsQuery, labReportsParams);
    } catch (error) {
      console.warn('Lab reports table may not exist:', error.message);
    }
    
    const [radiology] = await pool.execute(radiologyQuery, radiologyParams);
    const [pathology] = await pool.execute(pathologyQuery, pathologyParams);
    const [appointments] = await pool.execute(appointmentsQuery, appointmentsParams);

    res.json({
      patient: patient[0],
      records: {
        diagnosis,
        treatment,
        medicalHistory,
        labReports,
        radiology,
        pathology,
        appointments
      },
      counts: {
        diagnosis: diagnosis.length,
        treatment: treatment.length,
        medicalHistory: medicalHistory.length,
        labReports: labReports.length,
        radiology: radiology.length,
        pathology: pathology.length,
        appointments: appointments.length
      }
    });
  } catch (error) {
    console.error('Error fetching patient records:', error);
    res.status(500).json({ error: 'Failed to fetch patient records', details: error.message });
  }
});

export default router;

