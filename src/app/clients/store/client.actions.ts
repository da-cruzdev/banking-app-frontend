import { createAction, props } from '@ngrx/store';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';

export const GetUser = createAction(
  '[Client] Client'
  //   props<{ token: string }>()
);
export const GetUser_failed = createAction(
  '[Client] Client failed',
  props<{ error: string }>()
);

export const GetUser_success = createAction(
  '[Client] Client success',
  props<{ payload: UserDataResponse }>()
);
