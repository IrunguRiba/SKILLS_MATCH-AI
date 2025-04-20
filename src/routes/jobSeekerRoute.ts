import { Router } from 'express';
import { signup, login } from '../controllers/jobseekerController';

const jobSeekerrouter = Router();

jobSeekerrouter.post('/signup', signup);
jobSeekerrouter.post('/login', login);

export default jobSeekerrouter;