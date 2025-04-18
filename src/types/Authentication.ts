export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  success?: boolean;
  message: string;
  token: string;
  user: UserData;
  data: null;
} 