import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { TransationsListComponent } from './components/transations-list/transations-list.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { FilterTransactionListComponent } from './components/filter-transaction-list/filter-transaction-list.component';

@NgModule({
  declarations: [DashboardComponent, TransationsListComponent, UserInfoComponent, FilterTransactionListComponent],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
  exports: [DashboardComponent],
})
export class ClientModule {}
