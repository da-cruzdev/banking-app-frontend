import { createFeature, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';
import { state } from '@angular/animations';

interface State {
  user: UserDataResponse | null;
  loading: boolean;
  token: string;
}

const initialState: State = {
  user: null,
  loading: false,
  token: '',
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.SIGNUP, (state) => ({
      ...state,
      loading: true,
    })),
    on(AuthActions.SIGNUP_FAILED, (state) => ({
      ...state,
      loading: false,
    })),
    on(AuthActions.SIGNUP_SUCCESS, (state, { payload }) => ({
      ...state,
      user: payload,
      loading: false,
    })),
    on(AuthActions.LOGIN, (state) => ({
      ...state,
      loading: true,
    })),
    on(AuthActions.LOGIN_FAILED, (state) => ({
      ...state,
      loading: false,
    })),
    on(AuthActions.LOGIN_SUCCESS, (state, { token }) => ({
      ...state,
      token: token,
      loading: false,
    })),
    on(AuthActions.logout, (state) => ({ ...state })),
    on(AuthActions.logoutSuccess, (state) => ({ ...state, loading: false })),
    on(AuthActions.logoutFailure, (state) => ({ ...state, loading: false }))
  ),
});

export const { name, reducer, selectLoading, selectUser, selectToken } =
  authFeature;
