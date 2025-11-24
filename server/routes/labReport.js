import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Create a new lab report
router.post('/', async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      date,
      physician,
      hemoglobin,
      rbc,
      wbc,
      glucose,
      cholesterol,
      microbiologyFindings,
      xray,
      ctScan,
      mri,
      ultrasound
    } = req.body;

    if (!patientName || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await pool.execute(
      `INSERT INTO lab_report 
       (patient_id, patient_name, date, physician, hemoglobin, rbc, wbc, glucose, cholesterol, 
        microbiology_findings, xray, ct_scan, mri, ultrasound) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patientId || null,
        patientName,
        date,
        physician || null,
        hemoglobin || null,
        rbc || null,
        wbc || null,
        glucose || null,
        cholesterol || null,
        microbiologyFindings || null,
        xray || null,
        ctScan || null,
        mri || null,
        ultrasound || null
      ]
    );

    res.status(201).json({
      message: 'Lab report created successfully',
      reportId: result.insertId
    });
  } catch (error) {
    console.error('Error creating lab report:', error);
    res.status(500).json({ error: 'Failed to create lab report', details: error.message });
  }
});

// Get all lab reports
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM lab_report ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching lab reports:', error);
    res.status(500).json({ error: 'Failed to fetch lab reports', details: error.message });
  }
});

export default router;

