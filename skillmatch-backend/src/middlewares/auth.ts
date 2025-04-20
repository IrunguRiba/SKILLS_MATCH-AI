import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { query } from '../db';
import { Recruiter } from '../types/recruiter';

const JWT_SECRET = process.env.JWT_SECRET || 'irungujoel';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const result = await query('SELECT * FROM recruiters WHERE id = $1', [decoded.id]);
    
    if (!result.rows.length) {
      throw new Error();
    }
    req.recruiter = result.rows[0] as Recruiter;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};