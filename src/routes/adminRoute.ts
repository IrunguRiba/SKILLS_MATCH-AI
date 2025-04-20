import { Router } from 'express';
import { login } from '../controllers/adminController';

const adminRouter = Router();

adminRouter.post('/login', login);

export default adminRouter;