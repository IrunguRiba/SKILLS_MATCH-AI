// candidateName: '',
//     position: '',
//     date: '',
//     time: '',
//     type: 'Remote',
//     notes: ''


import { Request, Response } from 'express';
import asyncHandler from "../Middlewares/asyncHandler";
import pool from '../db'

export const getAllInterviews = asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await pool.query('SELECT * FROM interviews ORDER BY interview_date, interview_time');
  
      res.status(200).json(result.rows);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error fetching interviews:', err.message);
      } else {
        console.error('Unknown error:', err);
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // get an  interview by the ID
  export const getInterviewById = asyncHandler(async (req:Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM interviews WHERE id = $1', [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      res.status(200).json(result.rows[0]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error fetching job:', err.message);
      } else {
        console.error('Unknown error:', err);
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // create an interview

  export const createInterview = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { candidateName, position, interviewDate, interviewTime, type, notes, recruiterId } = req.body;
  
      // Validate required fields
      if (!candidateName || !position || !interviewDate || !interviewTime || !recruiterId) {
        res.status(400).json({ message: 'Candidate name, position, date, time, and recruiter ID are required.' });
        return;
      }
  
      const result = await pool.query(
        `INSERT INTO interviews (
          candidate_name, 
          position, 
          interview_date, 
          interview_time, 
          type, 
          notes, 
          recruiter_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [candidateName, position, interviewDate, interviewTime, type || 'Remote', notes, recruiterId]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error creating interview:', err instanceof Error ? err.message : err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  //update an interview
  export const updateInterview = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // Get the interview ID from the URL
      const { candidateName, position, interviewDate, interviewTime, type, notes, recruiterId } = req.body;
  
      if (!candidateName || !position || !interviewDate || !interviewTime || !recruiterId) {
        res.status(400).json({ message: 'Candidate name, position, date, time, and recruiter ID are required.' });
        return;
      }
  
      const result = await pool.query(
        `UPDATE interviews 
         SET candidate_name = $1,
             position = $2,
             interview_date = $3,
             interview_time = $4,
             type = $5,
             notes = $6,
             recruiter_id = $7
         WHERE id = $8
         RETURNING *`,
        [candidateName, position, interviewDate, interviewTime, type || 'Remote', notes, recruiterId, id]
      );
  
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Interview not found.' });
        return;
      }
  
      res.status(200).json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error updating interview:', err instanceof Error ? err.message : err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  // then delete an interview
  export const deleteInterview = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const result = await pool.query(
        `DELETE FROM interviews WHERE id = $1 RETURNING *`,
        [id]
      );
  
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Interview not found.' });
        return;
      }
  
      res.status(200).json({ message: 'Interview deleted successfully.' });
    } catch (err: unknown) {
      console.error('Error deleting interview:', err instanceof Error ? err.message : err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  