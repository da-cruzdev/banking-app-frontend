import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  GetUser,
  getUserTransactions,
} from 'src/app/clients/store/client.actions';
import {
  selectTransactions,
  selectUser,
} from 'src/app/clients/store/client.reducer';
import { selectAccountTypeFilter } from 'src/app/clients/store/client.selectors';
import { TransactionData } from 'src/app/shared/interfaces/transactions.interfaces';
import { UserDataResponse } from 'src/app/shared/interfaces/user.interfaces';

@Component({
  selector: 'app-transations-table',
  templateUrl: './transations-list.component.html',
  styleUrls: ['./transations-list.component.scss'],
})
export class TransationsTableComponent implements OnInit, OnDestroy {
  userTransactions$!: Observable<TransactionData[]>;
  userInfos$!: Observable<UserDataResponse | null>;
  userInfoSubscription: Subscription | undefined;
  accountTypeFilter$!: Observable<string | null>;

  constructor(private readonly store: Store) {}
  ngOnInit(): void {
    this.userInfos$ = this.store.select(selectUser);
    this.store.dispatch(getUserTransactions());

    this.userTransactions$ = this.store.select(selectTransactions);
    this.accountTypeFilter$ = this.store.select(selectAccountTypeFilter);
  }

  ngOnDestroy(): void {
    this.userInfoSubscription?.unsubscribe();
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
