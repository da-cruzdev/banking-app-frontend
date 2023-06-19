export interface AccountsDataResponse {
  iban: string;
  name: string;
  email: string;
  balance: number;
  currency?: string;
  parentId?: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
