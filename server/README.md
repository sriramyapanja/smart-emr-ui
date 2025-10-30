# Smart EMR Backend Server

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Database Connection

**What database are you using?** 

Based on your answer, run ONE of these commands:

**For PostgreSQL:**
```bash
npm install pg
```

**For MySQL:**
```bash
npm install mysql2
```

**For SQLite:**
```bash
npm install sqlite3 sqlite
```

### 3. Set Environment Variables

Create a `.env` file in the server folder:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432          # 5432 for PostgreSQL, 3306 for MySQL
DB_NAME=your_db_name
DB_USER=your_username
DB_PASSWORD=your_password
```

### 4. Update Database Config

Open `server/config/database.js` and uncomment the section for YOUR database type.

### 5. Start the Server

```bash
npm start
```

The server will run on http://localhost:3001

## Next Steps

Once you tell me what database you're using, I'll:
1. Configure the database connection
2. Create API routes for all your forms
3. Connect the frontend to the backend


