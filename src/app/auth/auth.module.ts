import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ForgotPasswordComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  exports: [RegisterComponent, LoginComponent],
})
export class AuthModule {}
