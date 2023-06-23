import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AccountsDataResponse,
  createSubAccountData,
} from 'src/app/shared/interfaces/accounts.interfaces';
import {
  CreateTransactionData,
  TransactionData,
} from 'src/app/shared/interfaces/transactions.interfaces';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url = environment.apiUrl;
  constructor(private readonly httpClient: HttpClient) {}

  getUser() {
    return this.httpClient.get<{ user: UserDataResponse }>(this.url + '/user');
  }

  getUserAccounts() {
    return this.httpClient.get<{
      mainAccount: AccountsDataResponse;
      subAccounts: AccountsDataResponse[];
    }>(this.url + `/users/accounts`);
  }

  createSubAccount(data: createSubAccountData) {
    return this.httpClient.post<AccountsDataResponse>(
      this.url + '/accounts/subaccounts/create',
      data
    );
  }

  createTransaction(data: CreateTransactionData) {
    return this.httpClient.post(this.url + '/transactions/create', data);
  }

  getUserTransactions(params: Record<string, string>) {
    return this.httpClient.get<TransactionData[]>(
      this.url + `/users/transactions`,
      { params }
    );
  }
}
