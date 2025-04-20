import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AdminLoginData } from '../types/admin';

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'secureAdminPassword123'
};

const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_CREDENTIALS.password, 10);

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: AdminLoginData = req.body;
    if (!username || !password) {
      res.status(400).json({
        error: 'Missing credentials',
        required: ['username', 'password']
      });
      return;
    }
    if (username !== ADMIN_CREDENTIALS.username) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      {
        id: 1,
        username,
        role: 'admin',
        isAdmin: true
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.json({
      admin: { username },
      token
    });
    return;

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
    return;
  }
};