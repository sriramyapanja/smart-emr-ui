import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Handle Radiology Imaging Request Submission
router.post('/', async (req, res) => {
  try {
    const {
      requestDate,    // frontend sends camelCase
      lab,
      testType,
      side_left,
      side_right,
      region,
      otherRegion,
      requests,
      otherTest,
      clinicalDetails,
      detailsForm,
      addEntry,
      dueDate
    } = req.body;

    // Validate required fields
    if (!requestDate || !lab || !testType) {
      return res.status(400).json({
        success: false,
        message: 'Request date, laboratory, and test type are required.'
      });
    }

    const sql = `
        INSERT INTO radiology_requests (
            request_date, laboratory, test_type, side_left, side_right, region, other_region,
            requests_printed, other_test, clinical_details, details_form, add_entry, due_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      requestDate,
      lab,
      testType,
      side_left || 0,
      side_right || 0,
      region || null,
      otherRegion || null,
      requests || null,
      otherTest || null,
      clinicalDetails || null,
      detailsForm || null,
      addEntry || 0,
      dueDate || null
    ];

    const [result] = await pool.execute(sql, values);
    
    res.json({ 
      success: true, 
      message: 'Radiology imaging request submitted successfully!',
      requestId: result.insertId
    });
  } catch (error) {
    console.error('Error inserting radiology request:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database insertion error.',
      error: error.message 
    });
  }
});

// Get all radiology requests
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM radiology_requests ORDER BY request_date DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching radiology requests:', error);
    res.status(500).json({ error: 'Failed to fetch radiology requests', details: error.message });
  }
});

export default router;

