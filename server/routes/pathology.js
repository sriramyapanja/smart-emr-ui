import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Create pathology request
router.post('/', async (req, res) => {
  try {
    const {
      patient_id,
      patient_name,
      doctor_name,
      test_date,
      request_date,
      lab,
      favourite_tests,
      test_list,
      clinical_details,
      last_cytology,
      cytology_date,
      hpv_not_required,
      hpv_reason,
      pregnancy_status,
      contraception_method,
      abnormal_bleeding,
      clinical_notes,
      copy_to,
      collection_by,
      fasting_status,
      billing_type
    } = req.body;

    if (!patient_name || !doctor_name) {
      return res.status(400).json({ error: 'Patient name and doctor name are required' });
    }

    // Convert arrays to JSON strings for storage
    const favouriteTestsJson = Array.isArray(favourite_tests) ? JSON.stringify(favourite_tests) : (favourite_tests || null);
    const testListJson = Array.isArray(test_list) ? JSON.stringify(test_list) : (test_list || null);
    const clinicalDetailsJson = Array.isArray(clinical_details) ? JSON.stringify(clinical_details) : (clinical_details || null);
    const collectionByJson = Array.isArray(collection_by) ? JSON.stringify(collection_by) : (collection_by || null);

    const [result] = await pool.execute(
      `INSERT INTO pathology_requests 
       (patient_id, patient_name, doctor_name, test_date, request_date, lab, favourite_tests, 
        test_list, clinical_details, last_cytology, cytology_date, hpv_not_required, hpv_reason,
        pregnancy_status, contraception_method, abnormal_bleeding, clinical_notes, copy_to,
        collection_by, fasting_status, billing_type) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patient_id || null,
        patient_name,
        doctor_name,
        test_date || null,
        request_date || null,
        lab || null,
        favouriteTestsJson,
        testListJson,
        clinicalDetailsJson,
        last_cytology || false,
        cytology_date || null,
        hpv_not_required || false,
        hpv_reason || null,
        pregnancy_status || null,
        contraception_method || null,
        abnormal_bleeding || null,
        clinical_notes || null,
        copy_to || null,
        collectionByJson,
        fasting_status || null,
        billing_type || null
      ]
    );

    res.status(201).json({
      message: 'Pathology request created successfully',
      requestId: result.insertId
    });
  } catch (error) {
    console.error('Error saving pathology request:', error);
    res.status(500).json({ error: 'Failed to save pathology request', details: error.message });
  }
});

// Get all pathology requests
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM pathology_requests ORDER BY created_at DESC');
    
    // Parse JSON strings back to arrays
    const parsedRows = rows.map(row => ({
      ...row,
      favourite_tests: row.favourite_tests ? JSON.parse(row.favourite_tests) : [],
      test_list: row.test_list ? JSON.parse(row.test_list) : [],
      clinical_details: row.clinical_details ? JSON.parse(row.clinical_details) : [],
      collection_by: row.collection_by ? JSON.parse(row.collection_by) : []
    }));
    
    res.json(parsedRows);
  } catch (error) {
    console.error('Error fetching pathology requests:', error);
    res.status(500).json({ error: 'Failed to fetch pathology requests', details: error.message });
  }
});

// Get pathology request by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM pathology_requests WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pathology request not found' });
    }
    
    const row = rows[0];
    const parsedRow = {
      ...row,
      favourite_tests: row.favourite_tests ? JSON.parse(row.favourite_tests) : [],
      test_list: row.test_list ? JSON.parse(row.test_list) : [],
      clinical_details: row.clinical_details ? JSON.parse(row.clinical_details) : [],
      collection_by: row.collection_by ? JSON.parse(row.collection_by) : []
    };
    
    res.json(parsedRow);
  } catch (error) {
    console.error('Error fetching pathology request:', error);
    res.status(500).json({ error: 'Failed to fetch pathology request', details: error.message });
  }
});

export default router;

