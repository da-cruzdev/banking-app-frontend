import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { TransactionData } from 'src/app/shared/interfaces/transactions.interfaces';
import { PaginationOptions } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = environment.apiUrl;
  constructor(private readonly httpClient: HttpClient) {}

  getAllTransactions(params: any) {
    return this.httpClient.get<{
      data: TransactionData[];
      pagination: PaginationOptions;
    }>(this.url + `/transactions`, {
      params,
    });
  }

  validateTransaction(id: string) {
    return this.httpClient.get<TransactionData>(
      this.url + `/transactions/${id}/validate`
    );
  }

  rejectTransaction(id: string) {
    return this.httpClient.get<TransactionData>(
      this.url + `/transactions/${id}/reject`
    );
  }

  updateTransaction(id: number) {
    return this.httpClient.post(this.url + `/transactions/${id}/update`, {});
  }
}
