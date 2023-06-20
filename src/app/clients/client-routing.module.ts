import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsListComponent } from './transations-list/containers/transactions-list/transactions-list.component';
import { TransactionTransfertComponent } from './transaction-transfert/transaction-transfert.component';
import { TransactionDebitComponent } from './transaction-debit/transaction-debit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: TransactionsListComponent },
      { path: 'transfert', component: TransactionTransfertComponent },
      { path: 'debit', component: TransactionDebitComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
