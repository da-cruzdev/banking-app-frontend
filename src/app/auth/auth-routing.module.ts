import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './forgot-password/reset-password-success/reset-password-success.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'account/forgot-password',
    component: ForgotPasswordComponent,
  },

  {
    path: 'account/reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'account/reset-success',
    component: ResetPasswordSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
