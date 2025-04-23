import { Recruiter } from '../../types/recruiter';

declare global {
  namespace Express {
    interface Request {
      recruiter?: Recruiter;
    }
  }
}