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

  constructor(private readonly store: Store) {}
  ngOnInit(): void {
    this.userInfos$ = this.store.select(selectUser);
    this.userInfoSubscription = this.userInfos$.subscribe((user) => {
      if (user) {
        const id = user.id;
        this.store.dispatch(getUserTransactions({ id: id.toString() }));
      }
    });
    this.userTransactions$ = this.store.select(selectTransactions);
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
  dataSource = [];
}
