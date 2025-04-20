import express from 'express';
import { signup, login, getRecruiter, deleteRecruiter } from '../controllers/recruiterController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/get', getRecruiter);
router.delete('/delete', deleteRecruiter);

export default router;
