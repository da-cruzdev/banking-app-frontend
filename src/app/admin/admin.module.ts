import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { adminFeature } from './store/admin.reducer';
import { AdminEffects } from './store/admin.effects';
import { EffectsModule } from '@ngrx/effects';
import { TransactionStatusPipe } from '../shared/pipes/transaction-status.pipe';

@NgModule({
  declarations: [DashboardAdminComponent, TransactionStatusPipe],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    StoreModule.forFeature(adminFeature),
    EffectsModule.forFeature([AdminEffects]),
  ],
})
export class AdminModule {}
