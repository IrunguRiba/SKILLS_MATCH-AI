import express from 'express';
import { signup, login, getJobSeeker, deleteJobSeeker } from '../controllers/jobseekerController';

const jobSeekerrouter = express.Router();

jobSeekerrouter.post('/signup', signup);
jobSeekerrouter.post('/login', login);
jobSeekerrouter.get('/', getJobSeeker);          
jobSeekerrouter.delete('/', deleteJobSeeker);    

export default jobSeekerrouter;
