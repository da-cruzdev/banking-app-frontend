import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { name } from 'src/app/auth/store/auth.reducer';
import { getUserTransactions } from 'src/app/clients/store/client.actions';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent {
  filterOptions: Record<string, string> = {};
  paginationOptions: Record<string, string> = {};

  constructor(private readonly store: Store) {}

  onFilter(options: Record<string, string>) {
    this.filterOptions = {
      ...this.filterOptions,
      ...this.paginationOptions,
      ...options,
    };

    this.store.dispatch(
      getUserTransactions({
        filterOptions: this.filterOptions,
        paginationOptions: this.paginationOptions,
      })
    );
  }
}
