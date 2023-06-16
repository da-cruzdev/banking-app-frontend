import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClientActions from './client.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ClientService } from '../services/client.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ClientEffects {
  signup$ = createEffect(() =>
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

  //   login$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.LOGIN),
  //       exhaustMap(({ payload }) =>
  //         this.authService.login(payload).pipe(
  //           map((response) => {
  //             this.toastrService.success(
  //               'Vous êtes connecté a votre compte avec succès'
  //             );
  //             this.router.navigate(['/dashboard']);
  //             localStorage.setItem('@token', response.token);

  //             return AuthActions.LOGIN_SUCCESS({ token: response.token });
  //           }),
  //           catchError((error) => {
  //             this.toastrService.error(error.error.error, 'Erreur');
  //             return of(AuthActions.LOGIN_FAILED());
  //           })
  //         )
  //       )
  //     )
  //   );

  constructor(
    private readonly actions$: Actions,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private readonly clientService: ClientService
  ) {}
}
