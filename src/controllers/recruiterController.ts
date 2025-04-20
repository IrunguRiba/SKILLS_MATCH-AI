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
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ error: 'Request body is empty' });
      return;
      

    }

    const { email, password, company_name, company_location }: RecruiterSignupData = req.body;

    // Validate required fields
    if (!email || !password || !company_name) {
      res.status(400).json({ 
        error: 'Missing required fields',
        required: ['email', 'password', 'company_name']
        
      });
      return;
    }

    // Check if email exists
    const existingRecruiter = await query(
      'SELECT email FROM recruiters WHERE email = $1', 
      [email]
    );

    if (existingRecruiter.rows.length > 0) {
      res.status(409).json({ error: 'Email already registered' });
      return;
    }
    console.log('Request body:', req.body);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create recruiter
    const newRecruiter = await query(
      `INSERT INTO recruiters 
       (email, password, company_name, company_location, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) 
       RETURNING email, company_name, company_location, created_at`,
      [email, hashedPassword, company_name, company_location || null]
    );

    // Generate JWT token
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
      res.status(500).json({ 
        error: 'Registration failed',
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find recruiter
    const result = await query(
      'SELECT * FROM recruiters WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const recruiter = result.rows[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { email, role: 'recruiter' },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    // Remove password from response
    const { password: _, ...recruiterWithoutPassword } = recruiter;

    res.json({
      recruiter: recruiterWithoutPassword,
      token
    });
  } catch (error: unknown) {
    console.error('Login error:', error);
    
    if (error instanceof Error) {
      res.status(500).json({ 
        error: 'Login failed',
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      });
    } else {
      res.status(500).json({ error: 'Login failed' });
    }
  }
};