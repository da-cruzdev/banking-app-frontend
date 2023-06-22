import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setAccountTypeFilter } from 'src/app/clients/store/client.actions';
import { selectAccountTypeFilter } from 'src/app/clients/store/client.selectors';

@Component({
  selector: 'app-filter-transaction-list',
  templateUrl: './filter-transaction-list.component.html',
  styleUrls: ['./filter-transaction-list.component.scss'],
})
export class FilterTransactionListComponent implements OnInit {
  accountTypeFilter$!: Observable<string | null>;
  searchText!: string;

  constructor(private readonly store: Store) {}
  ngOnInit(): void {
    this.accountTypeFilter$ = this.store.pipe(select(selectAccountTypeFilter));
  }

  onAccountTypeChange(filter: string) {
    this.store.dispatch(setAccountTypeFilter({ filter: filter }));
  }

  applyFilter() {}
}
