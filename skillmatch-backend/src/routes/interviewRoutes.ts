import express from 'express';
import { getAllInterviews, createInterview, getInterviewById } from '../controllers/interviewControllers';

const interviewRouter = express.Router()

interviewRouter.post('/create', createInterview);
interviewRouter.get('/', getAllInterviews);
interviewRouter.get('/interviews/:id', getInterviewById);
interviewRouter.put('/interviews/:id', createInterview);
interviewRouter.delete('/delete/:id', createInterview);

export default interviewRouter;