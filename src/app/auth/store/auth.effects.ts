import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as AuthActions from './auth.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';

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
            localStorage.setItem('@token', response.user.token);
            return AuthActions.SIGNUP_SUCCESS({
              payload: response.user,
            });
          }),
          catchError((error) => {
            if (error.error instanceof ErrorEvent) {
              this.toastrService.error(
                "Une erreur s'est produite. Veuillez réessayer.",
                'Erreur'
              );
            } else {
              this.toastrService.error(error.error.error, 'Erreur');
            }
            return of(AuthActions.SIGNUP_FAILED());
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private readonly storage: StorageMap
  ) {}
}
