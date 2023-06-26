import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  GetUser,
  getUserTransactions,
} from 'src/app/clients/store/client.actions';
import {
  selectPagination,
  selectTransactions,
  selectUser,
} from 'src/app/clients/store/client.reducer';
import { selectAccountTypeFilter } from 'src/app/clients/store/client.selectors';
import { PaginationOptions } from 'src/app/shared/interfaces';
import { TransactionData } from 'src/app/shared/interfaces/transactions.interfaces';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';

@Component({
  selector: 'app-transations-table',
  templateUrl: './transations-list.component.html',
  styleUrls: ['./transations-list.component.scss'],
})
export class TransationsTableComponent implements OnInit, OnDestroy {
  @Output() onSubmitPage: EventEmitter<any> = new EventEmitter<any>();

  userTransactions$!: Observable<TransactionData[]>;
  userInfos$!: Observable<UserDataResponse | null>;
  userInfoSubscription: Subscription | undefined;
  accountTypeFilter$!: Observable<string | null>;
  pagination$!: any;
  paginationSubscription: Subscription | undefined;
  paginationOptions: PaginationOptions = {
    skip: 0,
    take: 5,
  };

  constructor(private readonly store: Store) {}
  ngOnInit(): void {
    this.paginationSubscription = this.store
      .select(selectPagination)
      .subscribe((data) => {
        this.pagination$ = data;
      });

    this.userInfos$ = this.store.select(selectUser);
    this.store.dispatch(
      getUserTransactions({
        filterOptions: {
          ...this.paginationOptions,
        },
      })
    );

    this.userTransactions$ = this.store.select(selectTransactions);
    this.accountTypeFilter$ = this.store.select(selectAccountTypeFilter);
  }

  ngOnDestroy(): void {
    this.userInfoSubscription?.unsubscribe();
    this.paginationSubscription?.unsubscribe();
  }

  onPageChange(value: PageEvent) {
    console.log(value);
    this.onSubmitPage.emit(value);
  }

  displayedColumns: string[] = [
    'accountIbanEmitter',
    'transactionType',
    'amount',
    'accountReceiver',
    'createdAt',
    'status',
  ];
}
