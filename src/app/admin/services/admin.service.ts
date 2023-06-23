import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { TransactionData } from 'src/app/shared/interfaces/transactions.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = environment.apiUrl;
  constructor(private readonly httpClient: HttpClient) {}

  getAllTransactions(filterOptions: Record<string, string>) {
    const token = localStorage.getItem('@token');
    return this.httpClient.get<TransactionData[]>(this.url + '/transactions', {
      params: filterOptions,
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  validateTransaction(id: string) {
    const token = localStorage.getItem('@token');
    return this.httpClient.get<TransactionData>(
      this.url + `/transactions/${id}/validate`,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }
    );
  }

  rejectTransaction(id: string) {
    const token = localStorage.getItem('@token');
    return this.httpClient.get<TransactionData>(
      this.url + `/transactions/${id}/reject`,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }
    );
  }

  updateTransaction(id: number) {
    const token = localStorage.getItem('@token');
    return this.httpClient.post(this.url + `/transactions/${id}/update`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }
}
