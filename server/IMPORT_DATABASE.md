# How to Import Database Tables into MySQL

## Option 1: Using DBeaver (GUI - Easiest)

1. **Open DBeaver** and connect to your MySQL database
2. **Select your database**: `electronic_health_records`
3. **Open SQL Editor**: Right-click on the database → SQL Editor → New SQL Script
4. **Open the SQL file**: 
   - File → Open SQL Script
   - Navigate to: `server/config/complete_schema.sql`
   - Or copy the contents from the file
5. **Run the script**: Click "Execute SQL Script" button (or press Ctrl+Enter)
6. **Verify**: Check that all tables were created by expanding the database → Tables

## Option 2: Using Terminal/Command Line

1. **Open Terminal**
2. **Run this command**:
   ```bash
   mysql -u root -p'Srip1898!' electronic_health_records < server/config/complete_schema.sql
   ```

   Or if you prefer to enter password interactively:
   ```bash
   mysql -u root -p electronic_health_records < server/config/complete_schema.sql
   ```
   (Enter password when prompted: `Srip1898!`)

3. **Verify tables were created**:
   ```bash
   mysql -u root -p'Srip1898!' electronic_health_records -e "SHOW TABLES;"
   ```

## Option 3: Using MySQL Command Line

1. **Connect to MySQL**:
   ```bash
   mysql -u root -p
   ```
   (Enter password: `Srip1898!`)

2. **Select your database**:
   ```sql
   USE electronic_health_records;
   ```

3. **Run the SQL file**:
   ```sql
   SOURCE /Users/sriramyapanja/Documents/EMR/smart-emr-ui/server/config/complete_schema.sql;
   ```

4. **Verify**:
   ```sql
   SHOW TABLES;
   ```

## Tables That Will Be Created

After importing, you should have these tables:
- ✅ `patients`
- ✅ `diagnosis`
- ✅ `treatment`
- ✅ `medical_history`
- ✅ `lab_report`
- ✅ `appointment`
- ✅ `radiology_requests`

## Note

The SQL file uses `CREATE TABLE IF NOT EXISTS`, so it's safe to run multiple times - it won't create duplicate tables if they already exist.

