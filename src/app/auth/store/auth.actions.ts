import { createAction, props } from '@ngrx/store';
import {
  UserDataResponse,
  UserLoginData,
  UserSignupData,
} from 'src/app/shared/interfaces/user.interfaces';

export const SIGNUP = createAction(
  '[Auth] Signup',
  props<{ payload: UserSignupData }>()
);
export const SIGNUP_FAILED = createAction('[Auth] Signup failed');

export const SIGNUP_SUCCESS = createAction(
  '[Auth] Signup success',
  props<{ payload: UserDataResponse }>()
);

export const LOGIN = createAction(
  '[Auth] Login',
  props<{ payload: UserLoginData }>()
);
export const LOGIN_FAILED = createAction('[Auth] Login failed');

export const LOGIN_SUCCESS = createAction(
  '[Auth] Login success',
  props<{ user: UserDataResponse }>()
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure');
