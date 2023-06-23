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

  getAllTransactions() {
    const token = localStorage.getItem('@token');
    return this.httpClient.get<TransactionData[]>(this.url + '/transactions', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }
}
