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
  email: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}
