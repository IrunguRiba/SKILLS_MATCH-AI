import express from 'express';
import { signup, login, getRecruiter, deleteRecruiter } from '../controllers/recruiterController';

const recruiterRouter = express.Router();

recruiterRouter.post('/signup', signup);
recruiterRouter.post('/login', login);
recruiterRouter.get('/get', getRecruiter);
recruiterRouter.delete('/delete', deleteRecruiter);

export default recruiterRouter;