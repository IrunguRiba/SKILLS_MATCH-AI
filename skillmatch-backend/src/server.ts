import express from 'express';
import dotenv from 'dotenv'; 
import cors from 'cors';
import recruiterRouter from './routes/recruiterRoutes';
import adminRouter from './routes/adminRoutes';
import jobSeekerRouter from './routes/jobSeekerRoutes'; // Capitalized `Router` for consistency
import jobRouter from './routes/jobRoutes';
import cookieParser from 'cookie-parser';
import interviewRouter from './routes/interviewRoutes'; // Import the interview router
import portfoliosRouter from './routes/portfoliosRoutes'
import  usersRouter from './routes/usersRoutes'
import  aiRoute from './routes/aiRoute'



dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000; 
app.use(express.json());
app.use(cookieParser()); 

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization if using JWT
  credentials: true // Allow cookies or Authorization headers
}));

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use('/api/portfolios', portfoliosRouter)
app.use('/api/recruiters', recruiterRouter);
app.use('/api/admins', adminRouter);
app.use('/api/job-seekers', jobSeekerRouter);
app.use('/api/Jobs', jobRouter);
app.use ('/api/users', usersRouter);
app.use ('/api/ai', aiRoute);
app.use('/api/interviews', interviewRouter); // Use the interview router
// Root route
app.get('/', (req, res) => {
  res.send('✅ Skills Match API is live!');
});
     
// Start server
app.listen(port, () => {
  console.log(` Server is running on port: ${port}`);
});

export default app; 

// http://localhost:3000/api/Jobs/
//http://localhost:3000/api/interviews/create
// http://localhost:3000/api/interviews/interviews/:id