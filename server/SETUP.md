# Database Setup Instructions

## Step 1: Install MySQL Driver

```bash
cd server
npm install mysql2
```

## Step 2: Create Database

Connect to your MySQL server and create the database:

```sql
CREATE DATABASE smart_emr;
```

Or use the command line:
```bash
mysql -u root -p -e "CREATE DATABASE smart_emr;"
```

## Step 3: Create Database Tables

Run the schema file to create all necessary tables:

```bash
mysql -u root -p smart_emr < config/schema.sql
```

Or connect to MySQL and run the SQL file:
```bash
mysql -u root -p
USE smart_emr;
SOURCE config/schema.sql;
```

## Step 4: Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_NAME=smart_emr
DB_USER=root
DB_PASSWORD=your_mysql_password
```

Replace `your_mysql_password` with your actual MySQL root password.

## Step 5: Start the Server

```bash
npm run dev
```

The server will start on `http://localhost:3001` and automatically connect to your database.

## Testing the Connection

Visit `http://localhost:3001/api/test` to verify the database connection is working.

