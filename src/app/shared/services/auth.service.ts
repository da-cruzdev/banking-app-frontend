import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  signUp(data: any): Observable<any> {
    return this.httpClient
      .post(this.url + '/auth/create', data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(
        tap((response) => {
          console.log(response);
          this.toastr.success('Votre compte a été crée avec succèss');
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.toastr.error(
              "Une erreur s'est produite. Veuillez réessayer.",
              'Erreur'
            );
          } else {
            this.toastr.error(error.error.error, 'Erreur');
          }
          return throwError(error);
        })
      );
  }

  login(data: any): Observable<any> {
    return this.httpClient
      .post(this.url + '/auth/login', data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(
        tap((response) => {
          console.log(response);
          this.toastr.success('Vous êtes connecté a votre compte avec succès');
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.toastr.error(
              "Une erreur s'est produite. Veuillez réessayer.",
              'Erreur'
            );
          } else {
            this.toastr.error(error.error.error, 'Erreur');
          }
          return throwError(error);
        })
      );
  }
}
