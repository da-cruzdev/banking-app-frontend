import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AdminActions from './admin.actions';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { Store } from '@ngrx/store';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AdminEffects {
  getAllTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.getAllTransactions),
      exhaustMap(() =>
        this.adminService.getAllTransactions().pipe(
          map((response) => {
            console.log(response);

            return AdminActions.getAllTransactions_success({
              payload: response,
            });
          }),
          catchError((error) => {
            this.toastrService.error(error.error.error, 'Erreur');
            return of(AdminActions.getAllTransactions_failed({ error: error }));
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly toastrService: ToastrService,
    private readonly adminService: AdminService,
    private readonly store: Store
  ) {}
}
