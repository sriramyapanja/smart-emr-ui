import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const {
      patient_name,
      patient_email,
      doctor_name,
      appointment_date,
      appointment_time
    } = req.body;

    if (!patient_name || !patient_email || !doctor_name || !appointment_date || !appointment_time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check for conflicts (same doctor, date, and time)
    const [conflicts] = await pool.execute(
      'SELECT id FROM appointment WHERE doctor_name = ? AND appointment_date = ? AND appointment_time = ? AND status = "scheduled"',
      [doctor_name, appointment_date, appointment_time]
    );

    if (conflicts.length > 0) {
      return res.status(409).json({ error: 'This time slot is already booked' });
    }

    const [result] = await pool.execute(
      'INSERT INTO appointment (patient_name, patient_email, doctor_name, appointment_date, appointment_time) VALUES (?, ?, ?, ?, ?)',
      [patient_name, patient_email, doctor_name, appointment_date, appointment_time]
    );

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointmentId: result.insertId
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment', details: error.message });
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM appointment ORDER BY appointment_date, appointment_time');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments', details: error.message });
  }
});

// Check availability for a doctor and date
router.get('/availability', async (req, res) => {
  try {
    const { doctor, date } = req.query;
    
    if (!doctor || !date) {
      return res.status(400).json({ error: 'Doctor and date are required' });
    }

    const [booked] = await pool.execute(
      'SELECT appointment_time FROM appointment WHERE doctor_name = ? AND appointment_date = ? AND status = "scheduled"',
      [doctor, date]
    );

    const bookedTimes = booked.map(row => row.appointment_time);
    res.json({ bookedTimes });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Failed to check availability', details: error.message });
  }
});

export default router;

