import { createAction, props } from '@ngrx/store';

export const SIGNUP = createAction(
  '[Auth] Signup',
  props<{ payload: unknown }>()
);
export const SIGNUP_FAILED = createAction('[Auth] Signup failed');

export const SIGNUP_SUCCESS = createAction('[Auth] Signup success');
