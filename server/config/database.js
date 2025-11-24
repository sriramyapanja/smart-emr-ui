// Database configuration for MySQL
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'electronic_health_records',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Srip1898!',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    return { message: 'Database connected successfully' };
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error;
  }
};

export { pool };


