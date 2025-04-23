import express from 'express';
import { createJob, getAllJobs, getJobById, updateJob, deleteJob } from '../controllers/jobController';

  const jobRouter = express.Router()
  
  jobRouter.get("/",getAllJobs)
  jobRouter.post("/createJob", createJob)
  jobRouter.get("/:id", getJobById)
  jobRouter.put("/:id", updateJob)
  jobRouter.delete("/:id", deleteJob)
  
  export default jobRouter;

 