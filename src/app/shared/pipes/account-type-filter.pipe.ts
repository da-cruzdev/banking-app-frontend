import { Pipe, PipeTransform } from '@angular/core';
import { TransactionData } from '../interfaces/transactions.interfaces';

@Pipe({
  name: 'accountTypeFilter',
})
export class AccountTypeFilterPipe implements PipeTransform {
  transform(
    transactions: TransactionData[],
    accountTypeFilter: string | null
  ): TransactionData[] {
    if (!accountTypeFilter) {
      return transactions;
    }
    return transactions.filter(
      (transaction) => transaction.transactionType === accountTypeFilter
    );
  }
}
