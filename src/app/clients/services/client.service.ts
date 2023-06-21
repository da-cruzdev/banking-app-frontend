import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AccountsDataResponse,
  createSubAccountData,
} from 'src/app/shared/interfaces/accounts.interfaces';
import { CreateTransactionData } from 'src/app/shared/interfaces/transactions.interfaces';
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
    return this.httpClient.get<{
      mainAccount: AccountsDataResponse;
      subAccounts: AccountsDataResponse[];
    }>(this.url + `/users/${id}/accounts`, {
      headers: new HttpHeaders().set('Authorization', `${token}`),
    });
  }

  createSubAccount(data: createSubAccountData) {
    const token = localStorage.getItem('@token');

    return this.httpClient.post<AccountsDataResponse>(
      this.url + '/accounts/subaccounts/create',
      data,
      {
        headers: new HttpHeaders({
          Authorization: `${token}`,

          'Content-Type': 'application/json',
        }),
      }
    );
  }

  createTransaction(data: CreateTransactionData) {
    const token = localStorage.getItem('@token');

    return this.httpClient.post(this.url + '/transactions/create', data, {
      headers: new HttpHeaders({
        Authorization: `${token}`,

        'Content-Type': 'application/json',
      }),
    });
  }
}
