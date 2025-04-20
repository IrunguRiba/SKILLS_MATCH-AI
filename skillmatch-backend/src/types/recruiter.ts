export interface Recruiter {
    id: number;
    email: string;
    password: string;
    company_name: string;
    location:string;
    created_at: Date;
  }
  
  export interface RecruiterSignupData {
    email: string;
    password: string;
    company_name: string;
  }
  
  export interface RecruiterLoginData {
    email: string;
    password: string;
  }