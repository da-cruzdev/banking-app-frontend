export interface AccountsDataResponse {
  iban: string;
  name: string;
  email: string;
  balance: number;
  currency?: string;
  parentId?: string;
  userId: number;
  accountType: string;
  createdAt?: Date;
  updatedAt?: Date;
}
