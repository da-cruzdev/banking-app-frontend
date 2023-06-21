export interface CreateTransactionData {
  accountIbanEmitter: string | undefined;
  accountIbanReceiver: string;
  amount: number;
  reason: string;
  transactionType: string;
}

export interface TransactionData {
  id: number;
  amount: number;
  transactionType: string;
  reason: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  accountIbanEmitter: string;
  accountIbanReceiver: string;
  accountReceiver: AccountReceiver;
}

export interface AccountReceiver {
  iban: string;
  name: string;
  balance: number;
  currency: string;
  bic: string;
  accountType: string;
  createdAt: Date;
  updatedAt: Date;
  parentId: string;
  userId: number;
}
