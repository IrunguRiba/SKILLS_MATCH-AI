import { Pool } from 'pg';
import { config } from './config';

const pool = new Pool(config.db);

export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;