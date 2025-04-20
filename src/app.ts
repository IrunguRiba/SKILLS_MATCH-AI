import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/recruiterRoute';
import adminRouter from './routes/adminRoute';
import jobSeekerrouter from './routes/jobSeekerRoute';


const app = express();
dotenv.config();



// Middleware for parsing JSON
app.use(express.json()); 

app.use((req, res, next) => {
  console.log('Received headers:', req.headers);
  console.log('Request body:', req.body);
  next();
});
// Routes
app.use('/api/recruiters', router);
app.use('/api/admin', adminRouter);
app.use('/api/job-seekers', jobSeekerrouter);

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
