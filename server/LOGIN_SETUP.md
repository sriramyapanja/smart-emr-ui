# Login Setup Instructions

## Step 1: Install Required Packages

```bash
cd server
npm install express-session bcryptjs
```

## Step 2: Create Users Table

Run the SQL to create the users table:

**Option A: Using DBeaver**
1. Open DBeaver
2. Connect to `electronic_health_records` database
3. Open SQL Editor
4. Run the SQL from `server/config/users_table.sql`

**Option B: Using Terminal**
```bash
mysql -u root -p'Srip1898!' electronic_health_records < server/config/users_table.sql
```

## Step 3: Create Default Admin User

Run the script to create a default admin user:

```bash
cd server
node config/create_default_user.js
```

This will create:
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Important:** Change the password after first login!

## Step 4: Restart Your Server

The server should automatically restart with `--watch`, but if needed:

```bash
cd server
npm run dev
```

## Step 5: Test Login

1. Go to `http://localhost:5173/login` (or your frontend URL)
2. Login with:
   - Username: `admin`
   - Password: `admin123`

## How It Works

- **Login Page:** `/login` route shows the login form
- **Protected Routes:** All other pages require authentication
- **Session Management:** Uses express-session for server-side sessions
- **Logout:** Click "Logout" button in navigation bar

## Creating New Users

To create additional users, you can:
1. Add them directly to the database
2. Or create a user registration page (future enhancement)

## Default Credentials

- **Username:** admin
- **Password:** admin123

**Please change this password in production!**

