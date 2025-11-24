# Quick Database Setup Steps

## Step 1: Create the Table (Using Terminal)

```bash
mysql -u root -p electronic_health_records < server/config/radiology_table.sql
```

Enter your MySQL password when prompted (default: root1234)

## Step 2: Verify Table Was Created

```bash
mysql -u root -p -e "USE electronic_health_records; SHOW TABLES;"
```

You should see `radiology_requests` in the list.

## Step 3: Test the Connection

Visit: http://localhost:3001/api/test

## Step 4: Test the Form

1. Go to Radiology page in your app
2. Fill out the form
3. Submit
4. Check database in DBeaver to see the data!

