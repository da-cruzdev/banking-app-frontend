import { createAction, props } from '@ngrx/store';
import { AccountsDataResponse } from 'src/app/shared/interfaces/accounts.interfaces';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';

export const GetUser = createAction(
  '[Client] GetUser'
  //   props<{ token: string }>()
);
export const GetUser_failed = createAction(
  '[Client] GetUser failed',
  props<{ error: string }>()
);

export const GetUser_success = createAction(
  '[Client] GetUser success',
  props<{ payload: UserDataResponse }>()
);

export const getUserAccounts = createAction(
  '[Client] getUserAccounts',
  props<{ id: string }>()
);

export const getUserAccounts_failed = createAction(
  '[Client] getUserAccounts failed',
  props<{ error: string }>()
);

export const getUserAccounts_success = createAction(
  '[Client] getUserAccounts success',
  props<{ payload: AccountsDataResponse }>()
);
