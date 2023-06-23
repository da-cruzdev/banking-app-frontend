import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllTransactions } from '../store/admin.actions';
import { TransactionData } from 'src/app/shared/interfaces/transactions.interfaces';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { selectAllTransactions } from '../store/admin.reducer';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {
  accountTypeFilter$!: Observable<string | null>;
  allTransactions$!: Observable<TransactionData[]>;

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

  displayedColumns: string[] = [
    'accountIbanEmitter',
    'transactionType',
    'amount',
    'accountReceiver',
    'createdAt',
    'status',
  ];
}
