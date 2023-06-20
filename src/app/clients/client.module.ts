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
import { TransationsTableComponent } from './transations-list/components/table/transations-list.component';
import { TransactionsListComponent } from './transations-list/containers/transactions-list/transactions-list.component';
import { TransactionTransfertComponent } from './transaction-transfert/transaction-transfert.component';
import { TransactionDebitComponent } from './transaction-debit/transaction-debit.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserInfoComponent,
    AccountComponent,
    AccountTypePipe,
    FilterTransactionListComponent,
    TransationsTableComponent,
    TransactionsListComponent,
    TransactionTransfertComponent,
    TransactionDebitComponent,
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
