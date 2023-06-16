import { createFeature, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';

interface State {
  user: UserDataResponse | null;
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
    on(AuthActions.SIGNUP_FAILED, (state) => ({
      ...state,
      loading: false,
    })),
    on(AuthActions.SIGNUP_SUCCESS, (state, { payload }) => ({
      ...state,
      user: payload,
      loading: false,
    }))
  ),
});

export const { name, reducer, selectLoading, selectUser } = authFeature;
