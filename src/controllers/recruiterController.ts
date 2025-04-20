import { Request, Response } from 'express';
import { query } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface RecruiterSignupData {
  email: string;
  password: string;
  company_name: string;
  company_location?: string;
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ error: 'Request body is empty' });
      return;
    }

    const { email, password, company_name, company_location }: RecruiterSignupData = req.body;

    if (!email || !password || !company_name) {
      res.status(400).json({ error: 'Missing required fields', required: ['email', 'password', 'company_name'] });
      return;
    }

    const existingRecruiter = await query('SELECT email FROM recruiters WHERE email = $1', [email]);

    if (existingRecruiter.rows.length > 0) {
      res.status(409).json({ error: 'Email already registered' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRecruiter = await query(
      `INSERT INTO recruiters 
       (email, password, company_name, company_location, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) 
       RETURNING email, company_name, company_location, created_at`,
      [email, hashedPassword, company_name, company_location || null]
    );

    const token = jwt.sign(
      { email, role: 'recruiter' },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      recruiter: newRecruiter.rows[0],
      token
    });

  } catch (error: unknown) {
    console.error('Signup error:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: 'Registration failed', ...(process.env.NODE_ENV === 'development' && { details: error.message }) });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const result = await query('SELECT * FROM recruiters WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const recruiter = result.rows[0];

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { email, role: 'recruiter' },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    const { password: _, ...recruiterWithoutPassword } = recruiter;

    res.json({
      recruiter: recruiterWithoutPassword,
      token
    });
  } catch (error: unknown) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: 'Login failed', ...(process.env.NODE_ENV === 'development' && { details: error.message }) });
    } else {
      res.status(500).json({ error: 'Login failed' });
    }
  }
};

export const getRecruiter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, email } = req.query;

    if (!id && !email) {
      res.status(400).json({ error: 'Provide either id or email to fetch recruiter' });
      return;
    }

    let result;

    if (id) {
      result = await query('SELECT id, email, company_name, company_location, created_at FROM recruiters WHERE id = $1', [id]);
    } else {
      result = await query('SELECT id, email, company_name, company_location, created_at FROM recruiters WHERE email = $1', [email]);
    }

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Recruiter not found' });
      return;
    }

    res.json({ recruiter: result.rows[0] });

  } catch (error) {
    console.error('Get recruiter error:', error);
    res.status(500).json({ error: 'Failed to fetch recruiter' });
  }
};

export const deleteRecruiter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, email, company_name } = req.query;

    if (!id && !email && !company_name) {
      res.status(400).json({ error: 'Provide at least one of: id, email, or company_name to delete' });
      return;
    }

    let result;

    if (id) {
      result = await query('DELETE FROM recruiters WHERE id = $1 RETURNING *', [id]);
    } else if (email) {
      result = await query('DELETE FROM recruiters WHERE email = $1 RETURNING *', [email]);
    } else {
      result = await query('DELETE FROM recruiters WHERE company_name = $1 RETURNING *', [company_name]);
    }

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Recruiter not found or already deleted' });
      return;
    }

    res.json({ message: 'Recruiter deleted successfully', deleted: result.rows[0] });

  } catch (error) {
    console.error('Delete recruiter error:', error);
    res.status(500).json({ error: 'Failed to delete recruiter' });
  }
};
