import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClientActions from './client.actions';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../services/client.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from '../transations-list/components/dialogs/dialog-success/dialog-success.component';
import { DialogFailedComponent } from '../transations-list/components/dialogs/dialog-failed/dialog-failed.component';
import { Store } from '@ngrx/store';

@Injectable()
export class ClientEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.GetUser),
      exhaustMap(() =>
        this.clientService.getUser().pipe(
          map((response) => {
            const usernames = response.user.name.split(' ');
            const user = {
              ...response.user,
              slug: usernames[0][0] + usernames[1]?.[0] ?? '',
            };
            return ClientActions.GetUser_success({ payload: user });
          }),
          catchError((error) => {
            this.toastrService.error(error.error.error, 'Erreur');
            return of(ClientActions.GetUser_failed({ error: error }));
          })
        )
      )
    )
  );

  updateUserInfos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.updateUserInfos),
      exhaustMap(({ payload }) =>
        this.clientService.updateUserInfo(payload).pipe(
          map((response) => {
            console.log(response);
            this.toastrService.success(response.message);
            if (response.user.token) {
              localStorage.setItem('@token', response.user.token);
            }
            return ClientActions.updateUserInfos_success({
              user: response.user,
              message: response.message,
            });
          }),
          catchError((error) => {
            this.toastrService.error(error.error.error, 'Erreur');
            return of(ClientActions.updateUserInfos_failed({ error: error }));
          })
        )
      )
    )
  );

  getUserAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.getUserAccounts),
      exhaustMap(() =>
        this.clientService.getUserAccounts().pipe(
          map((response) => {
            return ClientActions.getUserAccounts_success({
              mainAccount: response.mainAccount,
              subAccounts: response.subAccounts,
            });
          }),
          catchError((error) => {
            return of(
              ClientActions.getUserAccounts_failed({ error: error.error.error })
            );
          })
        )
      )
    )
  );

  createSubAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.createSubAccount),
      exhaustMap(({ payload }) =>
        this.clientService.createSubAccount(payload).pipe(
          map((response) => {
            this.store.dispatch(ClientActions.getUserAccounts());
            return ClientActions.createSubAccount_success({
              payload: response,
            });
          }),
          catchError((error) => {
            return of(ClientActions.createSubAccount_failed({ error: error }));
          })
        )
      )
    )
  );

  blockSubAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.blockSubAccount),
      exhaustMap(({ iban }) =>
        this.clientService.blockSubAccount(iban).pipe(
          map((response) => {
            console.log(response);
            this.toastrService.success('Compte bloqué avec succès');
            return ClientActions.blockSubAccount_success({ account: response });
          }),
          catchError((error) => {
            this.toastrService.error(error.error.error);
            return of(ClientActions.blockSubAccount_failed({ error: error }));
          })
        )
      )
    )
  );

  unblockSubAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.unblockSubAccount),
      exhaustMap(({ iban }) =>
        this.clientService.unblockSubAccount(iban).pipe(
          map((response) => {
            console.log(response);
            this.toastrService.success('Compte débloqué avec succès');
            return ClientActions.unblockSubAccount_success({
              account: response,
            });
          }),
          catchError((error) => {
            this.toastrService.error(error.error.error);
            return of(ClientActions.unblockSubAccount_failed({ error: error }));
          })
        )
      )
    )
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.createTransaction),
      exhaustMap(({ payload }) =>
        this.clientService.createTransaction(payload).pipe(
          map((response) => {
            this.toastrService.success(
              'Votre transaction a été effectuée et est en cours de traitement'
            );
            this.dialog.open(DialogSuccessComponent, {
              width: '731px',
              height: '566px',
            });

            return ClientActions.createTransaction_succes({
              message: response.toString(),
            });
          }),
          catchError((error) => {
            console.log(error);
            this.dialog.open(DialogFailedComponent, {
              width: '731px',
              height: '566px',
            });
            this.toastrService.error(error.error.error);
            return of(ClientActions.createTransaction_failed({ error: error }));
          })
        )
      )
    )
  );

  getUserTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.getUserTransactions.type),
      exhaustMap(({ filterOptions }) =>
        this.clientService.getUserTransactions(filterOptions).pipe(
          map((response) => {
            return ClientActions.getUserTransactions_success({
              data: response.data,
              pagination: response.pagination,
            });
          }),
          catchError((error) => {
            console.log(error);

            this.toastrService.error(error.error.error);
            return of(
              ClientActions.getUserTransactions_failed({ error: error })
            );
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly toastrService: ToastrService,
    private readonly clientService: ClientService,
    private readonly dialog: MatDialog,
    private readonly store: Store
  ) {}
}
