// Portfolio payload data: 
/**
 * firstName
lastName

username
  about
Experinces

email


schoolName

skills []
location
projectUrl

CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    jobseeker_id INTEGER REFERENCES jobseekers(id) ON DELETE CASCADE,

    first_name VARCHAR(100),
    last_name VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    email VARCHAR(150) UNIQUE,

    about TEXT,
    experiences TEXT,
    skills TEXT[], -- Array of skills

    institution VARCHAR(150)[],
    location VARCHAR(150),
    project_url TEXT[],

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

 * 
 */
import { Request, Response } from 'express'
import asyncHandler from "../Middlewares/asyncHandler";
import pool from '../db'


//get all the data
export const getAllData = asyncHandler(async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM portfolios');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching portfolios:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//get portfolio by id
export const getPortfolioById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM portfolios WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Portfolio not found' });
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//create portfolio
export const createPortfolio = asyncHandler(async (req: Request, res: Response) => {
    const { jobseeker_id, first_name, last_name, username, email, about, experiences, skills, institution,
        location,
        project_url,
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO portfolios (
        jobseeker_id, first_name, last_name, username, email, about, experiences, skills, institution, location, project_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
            [
                jobseeker_id,
                first_name,
                last_name,
                username,
                email,
                about,
                experiences,
                skills,
                institution,
                location,
                project_url,
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating portfolio:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//update portfolio
export const updatePortfolio = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        first_name,
        last_name,
        username,
        email,
        about,
        experiences,
        skills,
        institution,
        location,
        project_url,
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE portfolios SET
        first_name = $1,
        last_name = $2,
        username = $3,
        email = $4,
        about = $5,
        experiences = $6,
        skills = $7,
        institution = $8,
        location = $9,
        project_url = $10,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
      RETURNING *`,
            [
                first_name,
                last_name,
                username,
                email,
                about,
                experiences,
                skills,
                institution,
                location,
                project_url,
                id,
            ]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Portfolio not found' });
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating portfolio:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//delete the portfolio
 export const deletePortfolio = asyncHandler(async (req: Request, res: Response) => {
 const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM portfolios WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Portfolio not found' });
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})
