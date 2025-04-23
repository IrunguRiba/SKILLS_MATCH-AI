import { Router } from 'express';
import { 
  getProfile, 
  updateProfile,
  getSkillAnalysis
} from '../controllers/userController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/skills/analysis', authenticate, getSkillAnalysis);

export default router;