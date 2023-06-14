import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './forgot-password/reset-password-success/reset-password-success.component';
import { StoreModule } from '@ngrx/store';
import { authFeature } from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ResetPasswordSuccessComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    StoreModule.forFeature(authFeature),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ResetPasswordSuccessComponent,
  ],
})
export class AuthModule {}
