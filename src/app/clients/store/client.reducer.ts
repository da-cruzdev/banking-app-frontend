import { createFeature, createReducer, on } from '@ngrx/store';
import * as ClientActions from './client.actions';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';
import { AccountsDataResponse } from 'src/app/shared/interfaces/accounts.interfaces';
import { TransactionData } from 'src/app/shared/interfaces/transactions.interfaces';
import { PaginationOptions } from 'src/app/shared/interfaces';

export interface State {
  user: UserDataResponse | null;
  loading: boolean;
  error: string | null;
  mainAccount: AccountsDataResponse | null;
  subAccounts: AccountsDataResponse[] | null;
  message: string | null;
  transactions: TransactionData[];
  accountTypeFilter: string | null;
  filters: unknown;
  account: AccountsDataResponse | null;
  pagination: PaginationOptions | null;
}

const initialState: State = {
  user: null,
  loading: false,
  error: null,
  mainAccount: null,
  subAccounts: null,
  message: null,
  transactions: [],
  accountTypeFilter: null,
  filters: null,
  account: null,
  pagination: null,
};

export const clientFeature = createFeature({
  name: 'client',
  reducer: createReducer(
    initialState,
    on(ClientActions.GetUser, (state) => ({
      ...state,
      loading: true,
    })),
    on(ClientActions.GetUser_failed, (state) => ({
      ...state,
      loading: false,
    })),

    on(ClientActions.GetUser_success, (state, { payload }) => ({
      ...state,
      user: payload,
      loading: false,
    })),
    on(ClientActions.getUserAccounts, (state) => ({
      ...state,
      loading: false,
    })),
    on(ClientActions.getUserAccounts_failed, (state) => ({
      ...state,
      loading: false,
    })),
    on(
      ClientActions.getUserAccounts_success,
      (state, { mainAccount, subAccounts }) => ({
        ...state,
        mainAccount,
        subAccounts,
        loading: false,
      })
    ),
    on(ClientActions.createSubAccount, (state) => ({
      ...state,
      loading: false,
    })),
    on(ClientActions.createSubAccount_failed, (state) => ({
      ...state,
      loading: false,
    })),
    on(ClientActions.createSubAccount_success, (state, { payload }) => ({
      ...state,
      account: payload,
      loading: false,
    })),
    on(ClientActions.blockSubAccount, (state) => ({
      ...state,
      loading: true,
    })),
    on(ClientActions.blockSubAccount_success, (state, { account }) => ({
      ...state,
      account: account,
      loading: false,
    })),
    on(ClientActions.blockSubAccount_failed, (state) => ({
      ...state,
      loading: false,
    })),
    on(ClientActions.unblockSubAccount, (state) => ({
      ...state,
      loading: true,
    })),
    on(ClientActions.unblockSubAccount_success, (state, { account }) => ({
      ...state,
      account: account,
      loading: false,
    })),
    on(ClientActions.unblockSubAccount_failed, (state) => ({
      ...state,
      loading: false,
    })),
    on(ClientActions.createTransaction, (state) => ({
      ...state,
      loading: true,
    })),
    on(ClientActions.createTransaction_succes, (state, { message }) => ({
      ...state,
      message,
      loading: false,
    })),
    on(ClientActions.createTransaction_failed, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(ClientActions.getUserTransactions, (state) => ({
      ...state,
      loading: true,
    })),
    on(
      ClientActions.getUserTransactions_success,
      (state, { data, pagination }) => ({
        ...state,
        transactions: data,
        pagination: pagination,
        loading: false,
      })
    ),
    on(ClientActions.getUserTransactions_failed, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(ClientActions.updateUserInfos, (state) => ({
      ...state,
      loading: true,
    })),
    on(ClientActions.updateUserInfos_success, (state, { user, message }) => ({
      ...state,
      message,
      user,
      loading: true,
    })),
    on(ClientActions.updateUserInfos_failed, (state, { error }) => ({
      ...state,
      error: error,
      loading: true,
    })),
    on(ClientActions.filterTransactions, (state, { filters }) => ({
      ...state,
      filters,
    }))
  ),
});

export const {
  name,
  reducer,
  selectLoading,
  selectUser,
  selectError,
  selectMainAccount,
  selectSubAccounts,
  selectMessage,
  selectTransactions,
  selectFilters,
  selectPagination,
} = clientFeature;
