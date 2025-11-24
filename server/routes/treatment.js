import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Create a new treatment
router.post('/', async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      date,
      diagnosis,
      medications,
      procedures,
      therapyPlan,
      diet,
      lifestyle,
      followUp
    } = req.body;

    if (!patientName || !date || !diagnosis || !medications) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await pool.execute(
      `INSERT INTO treatment 
       (patient_id, patient_name, date, diagnosis, medications, procedures, therapy_plan, diet, lifestyle, follow_up) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patientId || null,
        patientName,
        date,
        diagnosis,
        medications,
        procedures || null,
        therapyPlan || null,
        diet || null,
        lifestyle || null,
        followUp || null
      ]
    );

    res.status(201).json({
      message: 'Treatment created successfully',
      treatmentId: result.insertId
    });
  } catch (error) {
    console.error('Error creating treatment:', error);
    res.status(500).json({ error: 'Failed to create treatment', details: error.message });
  }
});

// Get all treatments
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM treatment ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching treatments:', error);
    res.status(500).json({ error: 'Failed to fetch treatments', details: error.message });
  }
});

export default router;

