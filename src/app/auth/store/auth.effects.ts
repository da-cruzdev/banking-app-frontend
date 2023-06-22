import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as AuthActions from './auth.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP),
      exhaustMap(({ payload }) =>
        this.authService.signUp(payload).pipe(
          map((response) => {
            this.toastrService.success('Votre compte a été crée avec succèss');
            this.router.navigate(['/dashboard']);
            if (response.user.token)
              localStorage.setItem('@token', response.user.token);
            return AuthActions.SIGNUP_SUCCESS({
              payload: response.user,
            });
          }),
          catchError((error) => {
            this.toastrService.error(error.error.error, 'Erreur');
            return of(AuthActions.SIGNUP_FAILED());
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN),
      exhaustMap(({ payload }) =>
        this.authService.login(payload).pipe(
          map((response) => {
            this.toastrService.success(
              'Vous êtes connecté a votre compte avec succès'
            );
            console.log(response);

            this.router.navigate(['/dashboard']);
            localStorage.setItem('@token', response.token);

            return AuthActions.LOGIN_SUCCESS({ token: response.token });
          }),
          catchError((error) => {
            this.toastrService.error(error.error.error, 'Erreur');
            return of(AuthActions.LOGIN_FAILED());
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => {
            this.router.navigate(['/auth/login']);

            this.toastrService.success();

            return AuthActions.logoutSuccess();
          }),
          catchError((error) => {
            console.log(error);

            this.toastrService.error(error.error.error, 'Erreur');
            return of(AuthActions.logoutFailure());
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}
}
