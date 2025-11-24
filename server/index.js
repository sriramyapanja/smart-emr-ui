import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { testConnection } from './config/database.js';

// Import route files
import patientRoutes from './routes/patients.js';
import treatmentRoutes from './routes/treatment.js';
import diagnosisRoutes from './routes/diagnosis.js';
import medicalHistoryRoutes from './routes/medicalHistory.js';
import labReportRoutes from './routes/labReport.js';
import appointmentRoutes from './routes/appointment.js';
import radiologyRoutes from './routes/radiology.js';
import pathologyRoutes from './routes/pathology.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration to allow credentials
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'b7e93f4d-58c7-4a5e-bf2e-9d4c88f0a3e7',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true,
    secure: false // Set to true in production with HTTPS
  }
}));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Smart EMR Backend API',
    status: 'running',
    endpoints: {
      test: '/api/test',
      patients: '/api/patients',
      treatment: '/api/treatment',
      diagnosis: '/api/diagnosis',
      medicalHistory: '/api/medical-history',
      labReport: '/api/lab-report',
      appointment: '/api/appointment',
      radiology: '/api/radiology',
      pathology: '/api/pathology',
      auth: '/api/auth'
    }
  });
});

// Test route
app.get('/api/test', async (req, res) => {
  try {
    await testConnection();
    res.json({ message: 'Backend server is running and database is connected!' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Backend server is running but database connection failed',
      error: error.message 
    });
  }
});

// Auth Routes (login, logout, check)
app.use('/api/auth', authRoutes);

// API Routes
app.use('/api/patients', patientRoutes);
app.use('/api/treatment', treatmentRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/medical-history', medicalHistoryRoutes);
app.use('/api/lab-report', labReportRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/radiology', radiologyRoutes);
app.use('/api/pathology', pathologyRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


