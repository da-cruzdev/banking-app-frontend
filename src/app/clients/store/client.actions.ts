import { createAction, props } from '@ngrx/store';
import {
  AccountsDataResponse,
  createSubAccountData,
} from 'src/app/shared/interfaces/accounts.interfaces';
import {
  CreateTransactionData,
  TransactionData,
} from 'src/app/shared/interfaces/transactions.interfaces';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';

export const GetUser = createAction(
  '[Client] GetUser'
  //   props<{ token: string }>()
);
export const GetUser_failed = createAction(
  '[Client] GetUser failed',
  props<{ error: string }>()
);

export const GetUser_success = createAction(
  '[Client] GetUser success',
  props<{ payload: UserDataResponse }>()
);

export const getUserAccounts = createAction('[Client] getUserAccounts');

export const getUserAccounts_failed = createAction(
  '[Client] getUserAccounts failed',
  props<{ error: string }>()
);

export const getUserAccounts_success = createAction(
  '[Client] getUserAccounts success',
  props<{
    mainAccount: AccountsDataResponse;
    subAccounts: AccountsDataResponse[];
  }>()
);

export const createSubAccount = createAction(
  '[Client] createSubAccount',
  props<{ payload: createSubAccountData }>()
);

export const createSubAccount_failed = createAction(
  '[Client] createSubAccount failed',
  props<{ error: string }>()
);

export const createSubAccount_success = createAction(
  '[Client] createSubAccount success',
  props<{ payload: AccountsDataResponse }>()
);

export const createTransaction = createAction(
  '[Client] createTransaction',
  props<{ payload: CreateTransactionData }>()
);

export const createTransaction_succes = createAction(
  '[Client] createTransaction success',
  props<{ message: string }>()
);

export const createTransaction_failed = createAction(
  '[Client] createTransaction failed',
  props<{ error: string }>()
);

export const getUserTransactions = createAction('[Client] getTransactions');

export const getUserTransactions_success = createAction(
  '[Client] getTransactions success',
  props<{ payload: TransactionData[] }>()
);

export const getUserTransactions_failed = createAction(
  '[Client] getTransactions failed',
  props<{ error: string }>()
);

export const setAccountTypeFilter = createAction(
  '[Client] Set Account Type Filter',
  props<{ filter: string }>()
);

export const filterTransactions = createAction(
  '[Transactions] Filter Transactions',
  props<{ filters: unknown }>()
);
