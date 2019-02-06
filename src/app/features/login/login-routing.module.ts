import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from '../login/login.component';

import { RouteGuardService } from '@app/core/auth/route-guard.service';


const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'login/forgotten-password',
    component: ForgottenPasswordComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'login/reset-password/:uniqueToken',
    component: ResetPasswordComponent,
    canActivate: [RouteGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
