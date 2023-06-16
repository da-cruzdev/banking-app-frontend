import { createAction, props } from '@ngrx/store';
import {
  UserDataResponse,
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
