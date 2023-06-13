import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
  exports: [DashboardComponent],
})
export class ClientModule {}
