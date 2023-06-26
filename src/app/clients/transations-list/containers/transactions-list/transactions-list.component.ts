import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { name } from 'src/app/auth/store/auth.reducer';
import { getUserTransactions } from 'src/app/clients/store/client.actions';
import {
  PaginationOptions,
  TransactionsFilterOptions,
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent {
  filterOptions: TransactionsFilterOptions = {};
  paginationOptions: PaginationOptions = {
    take: 10,
    skip: 0,
  };

  constructor(private readonly store: Store) {}

  onFilter(options: Record<string, string>) {
    this.filterOptions = {
      ...this.paginationOptions,
      ...this.filterOptions,
      ...options,
    };

    this.store.dispatch(
      getUserTransactions({
        filterOptions: this.filterOptions,
      })
    );
  }

  onPageChange($event: any) {
    this.paginationOptions = {
      take: +$event.pageSize,
      skip: Number($event.pageIndex) * Number($event.pageSize),
    };

    this.store.dispatch(
      getUserTransactions({
        filterOptions: {
          ...this.filterOptions,
          ...this.paginationOptions,
        },
      })
    );
  }
}
