import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserTransactions } from 'src/app/clients/store/client.actions';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent {
  filterOptions: Record<string, string> = {};

  constructor(private readonly store: Store) {}

  onFilter(options: Record<string, string>) {
    this.filterOptions = { ...this.filterOptions, ...options };

    this.store.dispatch(
      getUserTransactions({ filterOptions: this.filterOptions })
    );
  }
}
