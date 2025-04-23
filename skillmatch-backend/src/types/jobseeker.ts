export interface JobSeeker {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    county:string;
    created_at: Date;
  }
  
  export interface JobSeekerSignupData {
    email: string;
    password: string;
    name: string;
    skills: string[];
    first_name: string;
    last_name: string;
    county:string;
  }
  
  export interface JobSeekerLoginData {
    email: string;
    password: string;
  }