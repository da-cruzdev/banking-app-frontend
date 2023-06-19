import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountsDataResponse } from 'src/app/shared/interfaces/accounts.interfaces';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url = environment.apiUrl;
  constructor(private readonly httpClient: HttpClient) {}

  getUser() {
    const token = localStorage.getItem('@token');
    return this.httpClient.get<{ user: UserDataResponse }>(this.url + '/user', {
      headers: new HttpHeaders().set('Authorization', `${token}`),
    });
  }

  getUserAccounts(id: string) {
    const token = localStorage.getItem('@token');
    return this.httpClient.get<AccountsDataResponse>(
      this.url + `/users/${id}/accounts`,
      {
        headers: new HttpHeaders().set('Authorization', `${token}`),
      }
    );
  }
}
