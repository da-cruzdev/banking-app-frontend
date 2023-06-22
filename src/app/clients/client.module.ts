import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AccountComponent } from './components/account/account.component';
import { StoreModule } from '@ngrx/store';
import { clientFeature } from './store/client.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ClientEffects } from './store/client.effects';
import { AccountTypePipe } from '../shared/pipes/account-type.pipe';
import { FilterTransactionListComponent } from './transations-list/components/filter/filter-transaction-list.component';
import { TransactionsListComponent } from './transations-list/containers/transactions-list/transactions-list.component';
import { TransactionTransfertComponent } from './transaction-transfert/transaction-transfert.component';
import { TransactionDebitComponent } from './transaction-debit/transaction-debit.component';
import { DialogSuccessComponent } from './transations-list/components/dialogs/dialog-success/dialog-success.component';
import { DialogFailedComponent } from './transations-list/components/dialogs/dialog-failed/dialog-failed.component';
import { TransactionStatusPipe } from '../shared/pipes/transaction-status.pipe';
import { AccountTypeFilterPipe } from '../shared/pipes/account-type-filter.pipe';
import { TransationsTableComponent } from './transations-list/components/table/transations-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserInfoComponent,
    AccountComponent,
    AccountTypePipe,
    AccountTypeFilterPipe,
    TransactionStatusPipe,
    FilterTransactionListComponent,
    TransactionsListComponent,
    TransactionTransfertComponent,
    TransationsTableComponent,
    TransactionDebitComponent,
    DialogSuccessComponent,
    DialogFailedComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    StoreModule.forFeature(clientFeature),
    EffectsModule.forFeature([ClientEffects]),
  ],
  exports: [DashboardComponent],
})
export class ClientModule {}
