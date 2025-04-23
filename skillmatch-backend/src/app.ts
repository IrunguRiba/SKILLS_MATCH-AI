import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/recruiterRoute';
import adminRouter from './routes/adminRoute';
import jobSeekerrouter from './routes/jobSeekerRoute';
import helmet from 'helmet';
import morgan from 'morgan';




const app = express();
dotenv.config();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

app.use(cors({
  origin: ['http://localhost:4200'], // Only allow specific origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middleware for parsing JSON
app.use(express.json()); 

app.use((req, res, next) => {
  console.log('Received headers:', req.headers);
  console.log('Request body:', req.body);
  next();
});

// Routes
app.use('/api/recruiter', router);
app.use('/api/admin', adminRouter);
app.use('/api/job-seeker', jobSeekerrouter);
// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
