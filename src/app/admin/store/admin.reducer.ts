import { createFeature, createReducer, on } from '@ngrx/store';
import * as AdminActions from './admin.actions';
import { TransactionData } from 'src/app/shared/interfaces/transactions.interfaces';

export interface State {
  allTransactions: TransactionData[];
  loading: boolean;
}

const initialState: State = {
  allTransactions: [],
  loading: false,
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
      loading: true,
    }))
  ),
});

export const { name, selectAdminState, selectAllTransactions, selectLoading } =
  adminFeature;
