export interface UserSignupData {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserDataResponse {
  id: number;
  name: string;
  slug: string;
  email: string;
  token?: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}
