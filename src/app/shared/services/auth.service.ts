import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { httpResponse } from '../interfaces/http-response.interface';
import {
  UserDataResponse,
  UserLoginData,
  UserSignupData,
} from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

  signUp(data: UserSignupData) {
    return this.httpClient.post<{ user: UserDataResponse }>(
      this.url + '/auth/signup',
      data
    );
  }

  login(data: UserLoginData) {
    return this.httpClient.post<UserDataResponse>(
      this.url + '/auth/login',
      data
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('@token');
    return !!token;
  }

  logout() {
    const token = localStorage.getItem('@token');
    return this.httpClient.post(this.url + '/auth/logout', {
      headers: new HttpHeaders().set('Authorization', `${token}`),
    });
  }

  verifyForgotPass(data: any) {
    return this.httpClient
      .post<httpResponse>(this.url + '/auth/forget-password', data)
      .pipe(
        tap((response) => {
          console.log(response);
          const token = response.token;
          if (token) localStorage.setItem('token', token);
          this.toastrService.success(response.message);
          this.router.navigate(['/auth/account/reset-password']);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.toastrService.error(
              "Une erreur s'est produite. Veuillez réessayer.",
              'Erreur'
            );
          } else {
            this.toastrService.error(error.error.error, 'Erreur');
          }
          return throwError(() => error);
        })
      );
  }

  resetPassword(password: string, token: string) {
    return this.httpClient
      .post<httpResponse>(
        this.url + '/auth/reset-password',
        { password, token },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .pipe(
        tap((response) => {
          this.toastrService.success(response.message);
          this.router.navigate(['/auth/account/reset-success']);
          localStorage.removeItem('token');
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.toastrService.error(
              "Une erreur s'est produite. Veuillez réessayer.",
              'Erreur'
            );
          } else {
            this.toastrService.error(error.error.error, 'Erreur');
          }
          return throwError(() => error);
        })
      );
  }
}
