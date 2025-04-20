import { Recruiter } from './recruiter';

declare global {
  namespace Express {
    interface Request {
      recruiter?: Recruiter;
    }
  }
}