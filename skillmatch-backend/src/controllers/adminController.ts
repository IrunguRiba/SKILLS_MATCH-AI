import { Request, Response } from 'express';
import { query } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AdminSignupData, AdminLoginData } from '../types/admin';

const SALT_ROUNDS = 12;

// POST 
export const signup = async (req: Request, res: Response): Promise<void> => {
  try { 
    
    const { username, password, email, full_name, is_super_admin = false }: AdminSignupData = req.body;

    if (!username || !password || !email || !full_name) {
      res.status(400).json({
        error: 'Missing required fields',
        required: ['username', 'password', 'email', 'full_name']
      });
      return;
    }

    const existingAdmin = await query(
      'SELECT id FROM admins WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingAdmin.rows.length > 0) {
      res.status(409).json({ error: 'Username or email already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await query(
      `INSERT INTO admins 
       (username, password_hash, email, full_name, is_super_admin)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, username, email, full_name, is_super_admin, created_at`,
      [username, passwordHash, email, full_name, is_super_admin]
    );

    const token = jwt.sign(
      {
        id: result.rows[0].id,
        username,
        role: 'admin',
        isSuperAdmin: is_super_admin
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      admin: result.rows[0],
      token
    });

  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// POST 
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

    const result = await query(
      'SELECT * FROM admins WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    await query(
      'UPDATE admins SET last_login_at = NOW() WHERE id = $1',
      [admin.id]
    );

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: 'admin',
        isSuperAdmin: admin.is_super_admin
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    const { password_hash, ...adminData } = admin;
    res.json({
      admin: adminData,
      token
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// GET 
export const getAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, username, email } = req.query;

    if (!id && !username && !email) {
      res.status(400).json({
        error: 'Provide at least one of: id, username, or email'
      });
      return;
    }

    let result;

    if (id) {
      result = await query(
        'SELECT id, username, email, full_name, is_super_admin, created_at, last_login_at FROM admins WHERE id = $1',
        [id]
      );
    } else if (username) {
      result = await query(
        'SELECT id, username, email, full_name, is_super_admin, created_at, last_login_at FROM admins WHERE username = $1',
        [username]
      );
    } else if (email) {
      result = await query(
        'SELECT id, username, email, full_name, is_super_admin, created_at, last_login_at FROM admins WHERE email = $1',
        [email]
      );
    }

    if (!result || result.rows.length === 0) {
      res.status(404).json({ error: 'Admin not found' });
      return;
    }

    res.json({ admin: result.rows[0] });

  } catch (error) {
    console.error('Get admin error:', error);
    res.status(500).json({ error: 'Failed to fetch admin' });
  }
};

// DELETE 
export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.query.id as string;

    if (!id) {
      res.status(400).json({ error: 'Admin ID is required' });
      return;
    }

    const result = await query('SELECT id FROM admins WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Admin not found' });
      return;
    }

    await query('DELETE FROM admins WHERE id = $1', [id]);

    res.json({ message: 'Admin deleted successfully' });

  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({ error: 'Failed to delete admin' });
  }
};
