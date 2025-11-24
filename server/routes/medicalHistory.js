import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Create or update medical history
router.post('/', async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      chronicIllnesses,
      surgeries,
      currentMedications,
      allergies,
      hospitalizations,
      familyHistory,
      immunizations,
      socialHistory,
      otherConditions
    } = req.body;

    if (!patientName || !chronicIllnesses) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if medical history exists for this patient
    const [existing] = await pool.execute(
      'SELECT id FROM medical_history WHERE patient_id = ? OR patient_name = ?',
      [patientId || '', patientName]
    );

    if (existing.length > 0) {
      // Update existing record
      const [result] = await pool.execute(
        `UPDATE medical_history SET 
         chronic_illnesses = ?, surgeries = ?, current_medications = ?, allergies = ?, 
         hospitalizations = ?, family_history = ?, immunizations = ?, social_history = ?, other_conditions = ?
         WHERE id = ?`,
        [
          chronicIllnesses,
          surgeries || null,
          currentMedications || null,
          allergies || null,
          hospitalizations || null,
          familyHistory || null,
          immunizations || null,
          socialHistory || null,
          otherConditions || null,
          existing[0].id
        ]
      );

      res.json({
        message: 'Medical history updated successfully',
        historyId: existing[0].id
      });
    } else {
      // Create new record
      const [result] = await pool.execute(
        `INSERT INTO medical_history 
         (patient_id, patient_name, chronic_illnesses, surgeries, current_medications, allergies, 
          hospitalizations, family_history, immunizations, social_history, other_conditions) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          patientId || null,
          patientName,
          chronicIllnesses,
          surgeries || null,
          currentMedications || null,
          allergies || null,
          hospitalizations || null,
          familyHistory || null,
          immunizations || null,
          socialHistory || null,
          otherConditions || null
        ]
      );

      res.status(201).json({
        message: 'Medical history created successfully',
        historyId: result.insertId
      });
    }
  } catch (error) {
    console.error('Error saving medical history:', error);
    res.status(500).json({ error: 'Failed to save medical history', details: error.message });
  }
});

// Get all medical histories
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM medical_history ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching medical histories:', error);
    res.status(500).json({ error: 'Failed to fetch medical histories', details: error.message });
  }
});

export default router;

