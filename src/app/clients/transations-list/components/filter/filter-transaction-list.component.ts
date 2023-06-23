import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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
  @Output() onsubmit: EventEmitter<Record<string, string>> = new EventEmitter();
  accountTypeFilter$!: Observable<string | null>;
  searchText!: string;

  filterFields = {
    accountType: 'accountType',
    status: 'status',
    date: 'date',
    query: 'query',
  };

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.accountTypeFilter$ = this.store.pipe(select(selectAccountTypeFilter));
  }

  onAccountTypeChange(value: string) {
    this.onsubmit.emit({ [this.filterFields.accountType]: value });
  }

  onStatusChange(value: string) {
    this.onsubmit.emit({ [this.filterFields.status]: value });
  }

  onDateChange($event: MatDatepickerInputEvent<Date>) {
    this.onsubmit.emit({
      [this.filterFields.date]: new Date($event.value!).toISOString(),
    });
  }

  onQueryChange(value: string) {
    this.onsubmit.emit({ [this.filterFields.query]: value });
  }
}
