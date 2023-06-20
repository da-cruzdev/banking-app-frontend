import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { TransationsListComponent } from './components/transations-list/transations-list.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { FilterTransactionListComponent } from './components/filter-transaction-list/filter-transaction-list.component';
import { AccountComponent } from './components/account/account.component';
import { StoreModule } from '@ngrx/store';
import { clientFeature } from './store/client.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ClientEffects } from './store/client.effects';
import { AccountTypePipe } from '../shared/pipes/account-type.pipe';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TransationsListComponent,
    UserInfoComponent,
    FilterTransactionListComponent,
    AccountComponent,
    AccountTypePipe,
    TransactionsComponent,
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
