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