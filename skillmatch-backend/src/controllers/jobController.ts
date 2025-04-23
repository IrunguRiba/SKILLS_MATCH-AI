import { Request, Response } from 'express';
import pool from '../db';
import asyncHandler from "../Middlewares/asyncHandler";

//get all jobs
export const getAllJobs = asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await pool.query('SELECT * FROM jobs ORDER BY id DESC');
      res.status(200).json(result.rows);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error fetching jobs:', err.message);
      } else {
        console.error('Unknown error:', err);
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }); 
  // get a job by ID 
  export const getJobById = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
  
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

  //post a job 
export const createJob = asyncHandler(async (req:Request, res: Response) => {
try{
    const{title, company, description, location, skills, deadline, requirements} = req.body
    if (!title || !company || !description) {
     res.status(400).json({message: 'Title, company, and description are required fields.'})
     return
    }
    const skillsArray = skills.split(',').map((skill:string)=>skill.trim())
    
    const result = await pool.query(
     `INSERT INTO jobs (title, company, description, location,skills, deadline, requirements)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
     [title,company,description,location,skillsArray,deadline,requirements]
   );
   res.status(201).json(result.rows[0]);
     } catch (err: unknown) {
        console.error('Error creating job:', err instanceof Error ? err.message : err);
        res.status(500).json({ message: 'Internal Server Error' });
     }
   
   })

   //updating the existing jobs
   export const updateJob = asyncHandler(async (req: Request, res: Response)=>{
        try{
            const { id } = req.params;
           const { title, company, description, location, skills, deadline, requirements } = req.body;
            const skillsArray = skills.split(',').map((skill:string)=>skill.trim())
         const result = await pool.query(
            `UPDATE jobs
            SET title = $1, company = $2, description = $3, location = $4, skills = $5, deadline = $6, requirements = $7 WHERE id = $8 RETURNING *
            `,
            [title,company,description,location,skillsArray,deadline,requirements]
         )
         if (result.rows.length === 0) {
            res.status(404).json({ message: 'Job not found or unauthorized' });
            return
          }
          res.status(200).json(result.rows[0]);

        }catch(err: unknown){
            console.error('Error updating job:', err instanceof Error ? err.message : err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
   })


   //delete a job
export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      // Log to check the job ID
      console.log('Deleting job with ID:', id);
  
      const result = await pool.query(
        `DELETE FROM jobs 
         WHERE id = $1 RETURNING *`,  // Removed recruiter_id check
        [id]
      );
  
      if (result.rows.length === 0) {
        console.log('No matching job found for deletion');
        res.status(404).json({ message: 'Job not found' });
        return;
      }
  
      res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err: unknown) {
      console.error('Error deleting job:', err instanceof Error ? err.message : err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  