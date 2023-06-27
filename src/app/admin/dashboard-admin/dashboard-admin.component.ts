import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  getAllTransactions,
  rejectTransaction,
  validateTransaction,
} from '../store/admin.actions';
import { TransactionData } from 'src/app/shared/interfaces/transactions.interfaces';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  selectAllTransactions,
  selectPagination,
  selectTransaction,
} from '../store/admin.reducer';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
  PaginationOptions,
  TransactionsFilterOptions,
} from 'src/app/shared/interfaces';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {
  accountTypeFilter$!: Observable<string | null>;
  allTransactions$!: Observable<TransactionData[]>;
  transaction$!: TransactionData;
  filterOptions: TransactionsFilterOptions = {};
  paginationSubscription: Subscription | undefined;
  pagination$!: PaginationOptions | null;
  paginationOptions: PaginationOptions = {
    take: 5,
    skip: 0,
  };

  filterFields = {
    accountType: 'accountType',
    status: 'status',
    date: 'date',
    query: 'query',
  };

  constructor(
    private readonly store: Store,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      getAllTransactions({
        filterOptions: { ...this.paginationOptions, ...this.filterOptions },
      })
    );

    this.allTransactions$ = this.store.select(selectAllTransactions);

    this.paginationSubscription = this.store
      .select(selectPagination)
      .subscribe((data) => {
        this.pagination$ = data;
      });
  }

  ngOnDestroy(): void {
    this.paginationSubscription?.unsubscribe();
  }

  validateTransaction(id: string) {
    this.store.dispatch(validateTransaction({ id: id.toString() }));
  }

  rejectTransaction(id: string) {
    this.store.dispatch(rejectTransaction({ id: id.toString() }));
  }

  onAccountTypeChange(value: string) {
    this.filterOptions = {
      ...this.filterOptions,
      [this.filterFields.accountType]: value,
    };

    this.refreshTransactions();
  }

  onStatusChange(value: string) {
    this.filterOptions = {
      ...this.filterOptions,
      [this.filterFields.status]: value,
    };

    this.refreshTransactions();
  }

  onDateChange($event: MatDatepickerInputEvent<Date>) {
    this.filterOptions = {
      ...this.filterOptions,
      [this.filterFields.date]: new Date($event.value!).toISOString(),
    };

    this.refreshTransactions();
  }

  onQueryChange(value: string) {
    this.filterOptions = {
      ...this.filterOptions,
      [this.filterFields.query]: value,
    };

    this.refreshTransactions();
  }

  onPageChange($event: PageEvent) {
    this.paginationOptions = {
      take: +$event.pageSize,
      skip: Number($event.pageIndex) * Number($event.pageSize),
    };

    this.refreshTransactions();
  }

  private refreshTransactions() {
    this.store.dispatch(
      getAllTransactions({
        filterOptions: { ...this.filterOptions, ...this.paginationOptions },
      })
    );
  }

  logout() {
    localStorage.removeItem('@token');
    this.toastrService.success('Déconnexion réussie');
    this.router.navigate(['/auth/login']);
  }

  displayedColumns: string[] = [
    'accountIbanEmitter',
    'transactionType',
    'amount',
    'accountReceiver',
    'createdAt',
    'status',
    'actions',
  ];
}
