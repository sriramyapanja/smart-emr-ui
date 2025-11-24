// Script to create a default admin user
// Run this with: node server/config/create_default_user.js

import bcrypt from 'bcryptjs';
import { pool } from './database.js';

async function createDefaultUser() {
  try {
    const username = 'admin';
    const password = 'admin123';
    const role = 'admin';

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      console.log('User already exists. Updating password...');
      await pool.execute(
        'UPDATE users SET password = ?, role = ? WHERE username = ?',
        [hashedPassword, role, username]
      );
      console.log('Password updated successfully!');
    } else {
      // Create new user
      await pool.execute(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role]
      );
      console.log('Default user created successfully!');
    }

    console.log('\nDefault Login Credentials:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('\n⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating user:', error);
    process.exit(1);
  }
}

createDefaultUser();

