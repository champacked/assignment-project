export interface UserData {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface FormState {
  isDirty: boolean;
  data: UserData | null;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignInData {
  email: string;
  password: string;
}
