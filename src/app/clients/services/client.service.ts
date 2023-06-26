import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationOptions } from 'src/app/shared/interfaces';
import {
  AccountsDataResponse,
  createSubAccountData,
} from 'src/app/shared/interfaces/accounts.interfaces';
import {
  CreateTransactionData,
  TransactionData,
} from 'src/app/shared/interfaces/transactions.interfaces';
import {
  UserDataResponse,
  updateUserData,
} from 'src/app/shared/interfaces/user.interfaces';
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

  blockSubAccount(iban: string) {
    return this.httpClient.post<AccountsDataResponse>(
      this.url + `/accounts/${iban}/block`,
      {}
    );
  }

  unblockSubAccount(iban: string) {
    return this.httpClient.post<AccountsDataResponse>(
      this.url + `/accounts/${iban}/unblock`,
      {}
    );
  }

  createTransaction(data: CreateTransactionData) {
    return this.httpClient.post(this.url + '/transactions/create', data);
  }

  getUserTransactions(params: any) {
    return this.httpClient.get<{
      data: TransactionData[];
      pagination: PaginationOptions;
    }>(this.url + `/users/transactions`, { params });
  }

  updateUserInfo(data: updateUserData) {
    return this.httpClient.patch<UserDataResponse>(
      this.url + '/user/update',
      data
    );
  }
}
