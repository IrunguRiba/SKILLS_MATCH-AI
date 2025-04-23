import { Request, Response } from 'express';
import { query } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JobSeekerSignupData, JobSeekerLoginData } from '../types/jobseeker';

const SALT_ROUNDS = 10;

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, first_name, last_name, county, skills = [] }: JobSeekerSignupData = req.body;
    const requiredFields = ['email', 'password', 'first_name', 'last_name', 'county'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      res.status(400).json({ error: 'Missing required fields', missingFields });
      return;
    }

    const existing = await query('SELECT id FROM job_seekers_signup WHERE email = $1', [email]);

    if (existing.rows.length > 0) {
      res.status(409).json({ error: 'Email already registered' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await query(
      `INSERT INTO job_seekers_signup 
       (email, password, first_name, last_name, county, city, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
       RETURNING id, email, first_name, last_name, county, city, created_at`,
      [email, hashedPassword, first_name, last_name, county, skills]
    );

    const token = jwt.sign(
      { id: result.rows[0].id, email: result.rows[0].email, role: 'jobSeeker' },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({ jobSeeker: result.rows[0], token });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Registration failed', ...(process.env.NODE_ENV === 'development' && { details: error instanceof Error ? error.message : 'Unknown error' }) });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: JobSeekerLoginData = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password required', required: ['email', 'password'] });
      return;
    }

    const result = await query('SELECT * FROM job_seekers_signup WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const jobSeeker = result.rows[0];
    const isMatch = await bcrypt.compare(password, jobSeeker.password);

    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: jobSeeker.id, email: jobSeeker.email, role: 'jobSeeker' },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    const { password: _, ...jobSeekerData } = jobSeeker;

    res.json({ jobSeeker: jobSeekerData, token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed', ...(process.env.NODE_ENV === 'development' && { details: error instanceof Error ? error.message : 'Unknown error' }) });
  }
};

export const getJobSeeker = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, email } = req.query;

    if (!id && !email) {
      res.status(400).json({ error: 'Provide either id or email to fetch job seeker' });
      return;
    }

    let result;

    if (id) {
      result = await query('SELECT id, email, first_name, last_name, county, city, created_at FROM job_seekers_signup WHERE id = $1', [id]);
    } else {
      result = await query('SELECT id, email, first_name, last_name, county, city, created_at FROM job_seekers_signup WHERE email = $1', [email]);
    }

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Job seeker not found' });
      return;
    }

    res.json({ jobSeeker: result.rows[0] });

  } catch (error) {
    console.error('Get job seeker error:', error);
    res.status(500).json({ error: 'Failed to fetch job seeker' });
  }
};

export const deleteJobSeeker = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, email, first_name } = req.query;

    if (!id && !email && !first_name) {
      res.status(400).json({ error: 'Provide at least one of: id, email, or first_name to delete' });
      return;
    }

    let result;

    if (id) {
      result = await query('DELETE FROM job_seekers_signup WHERE id = $1 RETURNING *', [id]);
    } else if (email) {
      result = await query('DELETE FROM job_seekers_signup WHERE email = $1 RETURNING *', [email]);
    } else {
      result = await query('DELETE FROM job_seekers_signup WHERE first_name = $1 RETURNING *', [first_name]);
    }

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Job seeker not found or already deleted' });
      return;
    }

    res.json({ message: 'Job seeker deleted successfully', deleted: result.rows[0] });

  } catch (error) {
    console.error('Delete job seeker error:', error);
    res.status(500).json({ error: 'Failed to delete job seeker' });
  }
};
