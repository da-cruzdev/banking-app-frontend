import { createFeature, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

interface State {
  user: unknown;
  loading: boolean;
}

const initialState: State = {
  user: null,
  loading: false,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.SIGNUP, (state) => ({
      ...state,
      loading: true,
    })),
    on(AuthActions.SIGNUP_FAILED, AuthActions.SIGNUP_SUCCESS, (state) => ({
      ...state,
      loading: false,
    }))
  ),
});

export const { name, reducer, selectLoading, selectUser } = authFeature;
