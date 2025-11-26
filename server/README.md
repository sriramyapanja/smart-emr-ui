# Backend Server

Express.js backend server for the Smart EMR system.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure database:**
   - Database config: `config/database.js`
   - Default password: `Srip1898!`
   - Can be overridden via `DB_PASSWORD` environment variable

3. **Set up database:**
   ```bash
   mysql -u root -p'Srip1898!' electronic_health_records < config/database_schema.sql
   node config/create_default_user.js
   ```

4. **Start server:**
   ```bash
   npm run dev
   ```

Server runs on http://localhost:3001

## Project Structure

```
server/
├── config/              # Configuration
│   ├── database.js      # Database connection pool
│   └── database_schema.sql  # Complete database schema
├── routes/              # API route handlers
│   ├── patients.js      # Patient management
│   ├── diagnosis.js     # Diagnosis records
│   ├── treatment.js     # Treatment records
│   ├── pathology.js     # Pathology requests
│   ├── radiology.js     # Radiology requests
│   ├── auth.js          # Authentication
│   └── ...
└── index.js             # Server entry point
```

## API Routes

All routes are prefixed with `/api`:

- `/api/patients` - Patient CRUD operations
- `/api/diagnosis` - Diagnosis records
- `/api/treatment` - Treatment records
- `/api/pathology` - Pathology requests
- `/api/radiology` - Radiology requests
- `/api/auth` - Authentication (login, register, logout)

For detailed API documentation, see the route files in `routes/`.
