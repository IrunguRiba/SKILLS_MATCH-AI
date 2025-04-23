import { Pool } from 'pg';
import dotenv from 'dotenv'; 

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5000'),
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
};
pool.query('SELECT NOW()', (err, res) => {
  pool.on('connect', () => console.log('Database connected'));
pool.on('error', (err) => console.error('Database error:', err));
  if (err) console.error('Database connection error:', err);
  //else console.log('Database connected at:', res.rows[0].now);
});

export default pool;