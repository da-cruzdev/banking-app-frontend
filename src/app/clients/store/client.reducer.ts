import { createFeature, createReducer, on } from '@ngrx/store';
import * as ClientActions from './client.actions';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';
import { AccountsDataResponse } from 'src/app/shared/interfaces/accounts.interfaces';

interface State {
  user: UserDataResponse | null;
  loading: boolean;
  error: string | null;
  account: AccountsDataResponse | null;
}

const initialState: State = {
  user: null,
  loading: false,
  error: null,
  account: null,
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
    on(ClientActions.getUserAccounts_success, (state, { payload }) => ({
      ...state,
      account: payload,
      loading: false,
    }))
  ),
});

export const { name, reducer, selectLoading, selectUser, selectError } =
  clientFeature;
