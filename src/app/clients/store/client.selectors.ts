import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './client.reducer';

export const selectClientState = createFeatureSelector<State>('client');

export const selectUser = createSelector(
  selectClientState,
  (state: State) => state.user
);

export const selectMessage = createSelector(
  selectClientState,
  (state: State) => state.message
);

export const selectMainAccount = createSelector(
  selectClientState,
  (state: State) => state.mainAccount
);

export const selectSubAccounts = createSelector(
  selectClientState,
  (state: State) => state.subAccounts
);

export const selectTransactions = createSelector(
  selectClientState,
  (state: State) => state.transactions
);

export const selectLoading = createSelector(
  selectClientState,
  (state: State) => state.loading
);

export const selectError = createSelector(
  selectClientState,
  (state: State) => state.error
);

export const selectAccountTypeFilter = createSelector(
  selectClientState,
  (state: State) => state.accountTypeFilter
);

// export const selectFilteredTransactions = createSelector(

//   );
