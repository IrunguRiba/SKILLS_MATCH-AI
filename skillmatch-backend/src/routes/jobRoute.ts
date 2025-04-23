// src/routes/job.routes.ts
import { Router } from 'express';
import { requireRole } from '../middlewares/role.middleware';
import {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
  getPersonalizedRecommendations,
} from '../controllers/jobController';

const router = Router();

router
  .route('/')
  .get(getJobs)
  .post(requireRole(['recruiter']), createJob);

router.delete('/:id', requireRole(['admin', 'recruiter']), deleteJob);
router.get('/:id', getJobById);

// New route for personalized recommendations
router.get('/recommendations/personalized', requireRole(['job_seeker']), getPersonalizedRecommendations);

export default router;