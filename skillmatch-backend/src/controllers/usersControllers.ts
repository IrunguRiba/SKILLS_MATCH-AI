import { Request, Response } from 'express';
import pool from '../db';
import asyncHandler from "../Middlewares/asyncHandler";

//get the jobseekers first:
export const getAllJobSeekers = asyncHandler(async(req:Request, res:Response)=>{
   try {
        const result = await pool.query('SELECT * FROM job_seekers_signup');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching the jobSeekers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}) 
//get the recruiters
export const getAllRecruiters = asyncHandler(async(req:Request, res:Response)=>{
    try {
        const result = await pool.query('SELECT * FROM recruiters');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching the recruiters:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//funtion to delete a jobseeker
export const deleteJobSeekers = asyncHandler(async(req:Request, res:Response)=>{
     const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM job_seekers_signup WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Portfolio not found' });
    res.json({ message: 'Jobseeker deleted successfully' });
  } catch (error) {
    console.error('Error deleting jobseeker:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})
//function to delete a recruiter
export const deleteRecruiter = asyncHandler(async(req:Request, res:Response)=>{
    const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM recruiter WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Portfolio not found' });
    res.json({ message: 'Jobseeker deleted successfully' });
  } catch (error) {
    console.error('Error deleting recruiter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})