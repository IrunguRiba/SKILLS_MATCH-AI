export interface Admin {
  id: number;
  username: string;
  email: string;
  full_name: string;
  is_super_admin: boolean;
  created_at: Date;
  last_login_at?: Date;
}

export interface AdminLoginData {
  username: string;
  password: string;
}

export interface AdminSignupData {
  username: string;
  password: string;
  email: string;
  full_name: string;
  is_super_admin?: boolean;
}
