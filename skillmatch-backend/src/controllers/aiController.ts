//jobseeker= 'Find lreact jobs in nairobi' == return jobs. 
//recruiter= Find jobseekers with react skills"" === return jobseekers. 
import { Request, Response } from 'express';
import pool from '../db';
import { getIntentQuery } from '../services/geminiService';
import asyncHandler from "../Middlewares/asyncHandler";
export const aicontroller = asyncHandler(async(req: Request, res: Response)=>{
    const {message, userType} = req.body
    try{
         const query = await getIntentQuery(message, userType);
         
    if (!query) {
      return res.status(400).json({ message: 'No valid query returned from AI.' });
    }
    const result = await pool.query(query);
    const matchedRows = result.rows;
       // Determine result_type and matched IDs
    const resultType = userType.toLowerCase() === 'recruiter' ? 'jobseeker' : 'jobs';
    const resultIds = matchedRows.map((row: any) => row.id); // assuming 'id' is in each row

      res.status(200).json({ data: matchedRows });
    }catch(err){
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Failed to process request.' });
  }
    })

