import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  selectTransaction,
} from '../store/admin.reducer';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {
  accountTypeFilter$!: Observable<string | null>;
  allTransactions$!: Observable<TransactionData[]>;
  transacction$!: TransactionData;

  constructor(
    private readonly store: Store,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.store.dispatch(getAllTransactions());
    this.allTransactions$ = this.store.select(selectAllTransactions);
  }

  ngOnDestroy(): void {}
  logout() {
    localStorage.removeItem('@token');
    this.toastrService.success('Déconnexion réussie');
    this.router.navigate(['/auth/login']);
  }

  validateTransaction(id: string) {
    this.store.dispatch(validateTransaction({ id: id.toString() }));
  }
  rejectTransaction(id: string) {
    console.log('rejété===>');

    this.store.dispatch(rejectTransaction({ id: id.toString() }));
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
