import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import route files (we'll create these)
// import patientRoutes from './routes/patients.js';
// import treatmentRoutes from './routes/treatment.js';
// import diagnosisRoutes from './routes/diagnosis.js';
// import medicalHistoryRoutes from './routes/medicalHistory.js';
// import labReportRoutes from './routes/labReport.js';
// import appointmentRoutes from './routes/appointment.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Routes will be added here
// app.use('/api/patients', patientRoutes);
// app.use('/api/treatment', treatmentRoutes);
// app.use('/api/diagnosis', diagnosisRoutes);
// app.use('/api/medical-history', medicalHistoryRoutes);
// app.use('/api/lab-report', labReportRoutes);
// app.use('/api/appointment', appointmentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


