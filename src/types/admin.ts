export interface Admin {
    id: number;
    username: string;
    password: string; 
    created_at: Date;
  }
  
  export interface AdminLoginData {
    username: string;
    password: string;
  }