import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClientActions from './client.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

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

  getUserAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.getUserAccounts),
      exhaustMap(({ id }) =>
        this.clientService.getUserAccounts(id).pipe(
          map((response) => {
            console.log(response);
            return ClientActions.getUserAccounts_success({ payload: response });
          }),
          catchError((error) => {
            console.log(error);

            return of(ClientActions.getUserAccounts_failed({ error: error }));
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly toastrService: ToastrService,
    private readonly clientService: ClientService
  ) {}
}
