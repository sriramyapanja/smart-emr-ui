import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Create a new diagnosis
router.post('/', async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      date,
      symptoms,
      observations,
      provisionalDiagnosis,
      tests,
      finalDiagnosis,
      treatmentPlan,
      followUp
    } = req.body;

    if (!patientName || !date || !finalDiagnosis || !treatmentPlan) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await pool.execute(
      `INSERT INTO diagnosis 
       (patient_id, patient_name, date, symptoms, observations, provisional_diagnosis, tests, final_diagnosis, treatment_plan, follow_up) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patientId || null,
        patientName,
        date,
        symptoms || null,
        observations || null,
        provisionalDiagnosis || null,
        tests || null,
        finalDiagnosis,
        treatmentPlan,
        followUp || null
      ]
    );

    res.status(201).json({
      message: 'Diagnosis created successfully',
      diagnosisId: result.insertId
    });
  } catch (error) {
    console.error('Error creating diagnosis:', error);
    res.status(500).json({ error: 'Failed to create diagnosis', details: error.message });
  }
});

// Get all diagnoses
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM diagnosis ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching diagnoses:', error);
    res.status(500).json({ error: 'Failed to fetch diagnoses', details: error.message });
  }
});

export default router;

