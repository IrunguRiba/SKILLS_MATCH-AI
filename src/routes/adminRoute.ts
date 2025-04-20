import express from 'express';
import { signup, login, getAdmin, deleteAdmin } from '../controllers/adminController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', getAdmin);        
router.delete('/', deleteAdmin);  

export default router;
