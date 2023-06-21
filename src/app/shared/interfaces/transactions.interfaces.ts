export interface CreateTransactionData {
  accountIbanEmitter: string | undefined;
  accountIbanReceiver: string;
  amount: number;
  reason: string;
  transactionType: string;
}
