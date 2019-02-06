import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterComponent } from '@app/features/register/register.component';
import { RouteGuardService } from '@app/core/auth/route-guard.service';


const registerRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'register/:referral_user_id',
    component: RegisterComponent,
    canActivate: [RouteGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(registerRoutes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
