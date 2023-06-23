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

export const validateTransaction = createAction(
  '[Admin] validateTransaction',
  props<{ id: string }>()
);

export const validateTransaction_failed = createAction(
  '[Admin] validateTransaction',
  props<{ error: string }>()
);

export const validateTransaction_succes = createAction(
  '[Admin] updateTransaction',
  props<{ transaction: TransactionData }>()
);

export const rejectTransaction = createAction(
  '[Admin] rejectTransaction',
  props<{ id: string }>()
);

export const rejectTransaction_failed = createAction(
  '[Admin] rejectTransaction',
  props<{ error: string }>()
);

export const rejectTransaction_succes = createAction(
  '[Admin] updateTransaction',
  props<{ transaction: TransactionData }>()
);
