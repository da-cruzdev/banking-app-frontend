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

  signUp(data: any): Observable<any> {
    return this.httpClient.post(this.url + '/auth/create', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  login(data: any): Observable<any> {
    return this.httpClient
      .post(this.url + '/auth/login', data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(
        tap((response) => {
          console.log(response);
          this.toastrService.success(
            'Vous êtes connecté a votre compte avec succès'
          );
          this.router.navigate(['/dashboard']);
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

  verifyForgotPass(data: any): Observable<any> {
    return this.httpClient
      .post<httpResponse>(this.url + '/auth/forget-password', data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
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

  resetPassword(data: any, token: string): Observable<any> {
    return this.httpClient
      .post<httpResponse>(this.url + '/auth/reset-password', data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(
        tap((response) => {
          this.toastrService.success(response.message);
          this.router.navigate(['/auth/reset-success']);
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
