import { createAction, props } from '@ngrx/store';
import { TransactionData } from 'src/app/shared/interfaces/transactions.interfaces';

export const getAllTransactions = createAction('[Admin] getAllTransactions');

export const getAllTransactions_success = createAction(
  '[Admin] getAllTransactions success',
  props<{ payload: TransactionData[] }>()
);

export const getAllTransactions_failed = createAction(
  '[Admin] getAllTransactions failed',
  props<{ error: string }>()
);
