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
    const [rows] = await pool.execute(
      `SELECT * FROM patients 
       WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ? OR id = ?
       ORDER BY last_name, first_name`,
      [searchTerm, searchTerm, searchTerm, searchTerm, query]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error searching patients:', error);
    res.status(500).json({ error: 'Failed to search patients', details: error.message });
  }
});

// Get patient by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM patients WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Failed to fetch patient', details: error.message });
  }
});

// Get all records for a patient
router.get('/:id/records', async (req, res) => {
  try {
    const patientId = req.params.id;
    const { startDate, endDate } = req.query;

    // Get patient info
    const [patient] = await pool.execute('SELECT * FROM patients WHERE id = ?', [patientId]);
    if (patient.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patientName = `%${patient[0].first_name}% ${patient[0].last_name}%`;
    const patientEmail = patient[0].email || '';

    // Build queries with date filters
    let diagnosisQuery = 'SELECT * FROM diagnosis WHERE patient_id = ? OR patient_name LIKE ?';
    let diagnosisParams = [patientId, patientName];
    
    let treatmentQuery = 'SELECT * FROM treatment WHERE patient_id = ? OR patient_name LIKE ?';
    let treatmentParams = [patientId, patientName];
    
    let labReportsQuery = 'SELECT * FROM lab_report WHERE patient_id = ? OR patient_name LIKE ?';
    let labReportsParams = [patientId, patientName];
    
    let radiologyQuery = 'SELECT * FROM radiology_requests WHERE patient_id = ? OR patient_name LIKE ?';
    let radiologyParams = [patientId, patientName];
    
    let appointmentsQuery = 'SELECT * FROM appointment WHERE patient_name LIKE ? OR patient_email = ?';
    let appointmentsParams = [patientName, patientEmail];

    if (startDate && endDate) {
      diagnosisQuery += ' AND date >= ? AND date <= ?';
      diagnosisParams.push(startDate, endDate);
      
      treatmentQuery += ' AND date >= ? AND date <= ?';
      treatmentParams.push(startDate, endDate);
      
      labReportsQuery += ' AND date >= ? AND date <= ?';
      labReportsParams.push(startDate, endDate);
      
      radiologyQuery += ' AND request_date >= ? AND request_date <= ?';
      radiologyParams.push(startDate, endDate);
      
      appointmentsQuery += ' AND appointment_date >= ? AND appointment_date <= ?';
      appointmentsParams.push(startDate, endDate);
    }

    diagnosisQuery += ' ORDER BY date DESC';
    treatmentQuery += ' ORDER BY date DESC';
    labReportsQuery += ' ORDER BY date DESC';
    radiologyQuery += ' ORDER BY request_date DESC';
    appointmentsQuery += ' ORDER BY appointment_date DESC';

    // Get all records
    const [diagnosis] = await pool.execute(diagnosisQuery, diagnosisParams);
    const [treatment] = await pool.execute(treatmentQuery, treatmentParams);
    const [medicalHistory] = await pool.execute(
      'SELECT * FROM medical_history WHERE patient_id = ? OR patient_name LIKE ? ORDER BY updated_at DESC',
      [patientId, patientName]
    );
    const [labReports] = await pool.execute(labReportsQuery, labReportsParams);
    const [radiology] = await pool.execute(radiologyQuery, radiologyParams);
    const [appointments] = await pool.execute(appointmentsQuery, appointmentsParams);

    res.json({
      patient: patient[0],
      records: {
        diagnosis,
        treatment,
        medicalHistory,
        labReports,
        radiology,
        appointments
      },
      counts: {
        diagnosis: diagnosis.length,
        treatment: treatment.length,
        medicalHistory: medicalHistory.length,
        labReports: labReports.length,
        radiology: radiology.length,
        appointments: appointments.length
      }
    });
  } catch (error) {
    console.error('Error fetching patient records:', error);
    res.status(500).json({ error: 'Failed to fetch patient records', details: error.message });
  }
});

export default router;

