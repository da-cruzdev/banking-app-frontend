import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardAdminComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  exports: [DashboardAdminComponent],
})
export class AdminModule {}
