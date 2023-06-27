import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AdminActions from './admin.actions';
import { ToastrService } from 'ngx-toastr';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { AdminService } from '../services/admin.service';

@Injectable()
export class AdminEffects {
  getAllTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.getAllTransactions),
      exhaustMap(({ filterOptions }) =>
        this.adminService.getAllTransactions(filterOptions).pipe(
          map((response) => {
            console.log(response);

            return AdminActions.getAllTransactions_success({
              data: response.data,
              pagination: response.pagination,
            });
          }),
          catchError((error) => {
            console.log(error);

            this.toastrService.error(error.error.error, 'Erreur');
            return of(AdminActions.getAllTransactions_failed({ error: error }));
          })
        )
      )
    )
  );

  validateTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.validateTransaction),
      exhaustMap(({ id }) =>
        this.adminService.validateTransaction(id).pipe(
          mergeMap((response) => {
            console.log(response);
            this.toastrService.success('Transaction validée');
            return [
              AdminActions.validateTransaction_succes({
                transaction: response,
              }),
              AdminActions.validateTransaction_failed({ error: '' }),
            ];
          }),
          catchError((error) => {
            this.toastrService.error(error.error.error, 'Erreur');
            return of(
              AdminActions.validateTransaction_failed({ error: error })
            );
          })
        )
      )
    )
  );

  validateTransactionsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.validateTransaction_succes),
        concatMap(({ transaction }) =>
          this.adminService
            .updateTransaction(transaction.id)
            .pipe(map((response) => {}))
        )
      ),
    { dispatch: false }
  );

  rejectTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.rejectTransaction),
      exhaustMap(({ id }) =>
        this.adminService.rejectTransaction(id).pipe(
          map((response) => {
            console.log(response);
            this.toastrService.success('Transaction réjetéé');
            return AdminActions.rejectTransaction_succes({
              transaction: response,
            });
          }),
          catchError((error) => {
            this.toastrService.error(error.error.error, 'Erreur');
            return of(AdminActions.rejectTransaction_failed({ error: error }));
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly toastrService: ToastrService,
    private readonly adminService: AdminService
  ) {}
}
