# Database Configuration

## Schema File

All database schema definitions are consolidated in a single file:

**`database_schema.sql`** - Complete database schema matching the actual database structure

This file contains all table definitions:
- `patients` - Patient information (primary table)
- `diagnosis` - Diagnosis records
- `treatment` - Treatment records
- `medical_history` - Medical history
- `lab_reports` - Laboratory test results
- `appointments` - Appointment scheduling
- `radiology_requests` - Radiology imaging requests
- `pathology_requests` - Pathology test requests
- `users` - User authentication

## Important Notes

### Patient ID Linking
All tables use `patient_id` as the primary linking key. When the same `patient_id` is used across different forms, all records are automatically linked to that patient.

### Setting Up the Database

1. **Create the database:**
   ```sql
   CREATE DATABASE electronic_health_records;
   ```

2. **Run the schema:**
   ```bash
   mysql -u root -p'Srip1898!' electronic_health_records < server/config/database_schema.sql
   ```
   (Or enter password interactively when prompted)

3. **Create default admin user:**
   ```bash
   node server/config/create_default_user.js
   ```

### User Management

**IMPORTANT:** Never insert users directly with plain text passwords!

Use the provided script to create users with properly hashed passwords:
```bash
node server/config/create_default_user.js
```

## Database Connection

Connection settings are in `database.js`. Current configuration:
- Host: localhost
- User: root
- Password: Srip1898! (default, can be overridden via DB_PASSWORD env variable)
- Database: electronic_health_records

