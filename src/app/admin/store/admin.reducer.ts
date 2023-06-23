import { createFeature, createReducer, on } from '@ngrx/store';
import * as AdminActions from './admin.actions';
import { TransactionData } from 'src/app/shared/interfaces/transactions.interfaces';

export interface State {
  allTransactions: TransactionData[];
  loading: boolean;
  transaction: TransactionData | null;
  error: string | null;
}

const initialState: State = {
  allTransactions: [],
  loading: false,
  transaction: null,
  error: null,
};

export const adminFeature = createFeature({
  name: 'admin',
  reducer: createReducer(
    initialState,
    on(AdminActions.getAllTransactions, (state) => ({
      ...state,
      loading: true,
    })),
    on(AdminActions.getAllTransactions_failed, (state) => ({
      ...state,
      loading: false,
    })),
    on(AdminActions.getAllTransactions_success, (state, { payload }) => ({
      ...state,
      allTransactions: payload,
      loading: false,
    })),
    on(AdminActions.validateTransaction, (state) => ({
      ...state,
      loading: true,
    })),
    on(AdminActions.validateTransaction_succes, (state, { transaction }) => ({
      ...state,
      payload: transaction,
      loading: false,
    })),
    on(AdminActions.validateTransaction_failed, (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
    })),
    on(AdminActions.rejectTransaction, (state) => ({
      ...state,
      loading: true,
    })),
    on(AdminActions.rejectTransaction_succes, (state, { transaction }) => ({
      ...state,
      payload: transaction,
      loading: false,
    })),
    on(AdminActions.rejectTransaction_failed, (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
    }))
  ),
});

export const {
  name,
  selectAdminState,
  selectAllTransactions,
  selectLoading,
  selectTransaction,
} = adminFeature;
