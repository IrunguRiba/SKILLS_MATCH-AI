import dotenv from 'dotenv';

dotenv.config();

export const config = {
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5000'),
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || 'AIzaSyDI0mQ8bhasfCO5p_alwkD4NKY6PngTO8c',
    model: 'gemini-pro'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
    expiresIn: '7d'
  }
};