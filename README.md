# Smart Electronic Medical Records (EMR) System

<<<<<<< HEAD
A full-stack web application for managing electronic medical records with patient registration, diagnosis, treatment, pathology, radiology, and appointment scheduling.

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up the database:**
   ```bash
   # Create database
   mysql -u root -p'Srip1898!' -e "CREATE DATABASE IF NOT EXISTS electronic_health_records;"
   
   # Import schema
   mysql -u root -p'Srip1898!' electronic_health_records < server/config/database_schema.sql
   
   # Create default admin user
   cd server
   node config/create_default_user.js
   cd ..
   ```

5. **Start the application:**
   ```bash
   # Terminal 1: Start backend server
   cd server
   npm run dev
   
   # Terminal 2: Start frontend server
   npm run dev
   ```

6. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Default login:
     - Username: `admin`
     - Password: `admin123`

## 📁 Project Structure

```
smart-emr-ui/
├── src/                    # Frontend React application
│   ├── pages/             # React page components
│   ├── App.jsx            # Main app component with routing
│   └── main.jsx           # Entry point
├── server/                 # Backend Express server
│   ├── config/            # Configuration files
│   │   ├── database.js    # Database connection
│   │   └── database_schema.sql  # Complete database schema
│   ├── routes/            # API route handlers
│   └── index.js           # Server entry point
├── public/                 # Static assets
└── README.md              # This file
```

## 🗄️ Database

- **Database Name:** `electronic_health_records`
- **Database Password:** `Srip1898!` (default)
- **Tables:** patients, diagnosis, treatment, medical_history, lab_reports, appointments, radiology_requests, pathology_requests, users

All tables use `patient_id` as the primary linking key to connect records across all forms.

##  Features

- **Patient Management:** Register and search patients
- **Diagnosis:** Record and track patient diagnoses
- **Treatment:** Manage treatment plans and medications
- **Pathology Requests:** Submit pathology test requests
- **Radiology Requests:** Submit radiology imaging requests
- **Medical History:** Comprehensive medical history tracking
- **Lab Reports:** Laboratory test results management
- **Appointments:** Schedule and manage appointments
- **User Authentication:** Secure login system

## 🔧 Configuration

Database connection settings can be modified in `server/config/database.js` or via environment variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=electronic_health_records
DB_USER=root
DB_PASSWORD=Srip1898!
```

## API Endpoints

- `GET /api/patients` - Get all patients
- `GET /api/patients/search?query=...` - Search patients
- `GET /api/patients/:id/records` - Get all records for a patient
- `POST /api/patients` - Create new patient
- `POST /api/diagnosis` - Create diagnosis record
- `POST /api/treatment` - Create treatment record
- `POST /api/pathology` - Submit pathology request
- `POST /api/radiology` - Submit radiology request
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Development

- Frontend runs on port 5173 (Vite dev server)
- Backend runs on port 3001 (Express server)
- Backend auto-reloads on file changes (--watch mode)


FRONT END: http://localhost:5173
BACK END: http://localhost:3001
>>>>>>> 07140fefe5699e58fa0262d39fa1b5cc3409c95b
