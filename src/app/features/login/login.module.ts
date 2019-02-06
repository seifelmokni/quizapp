import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { LoginRoutingModule } from '@app/features/login/login-routing.module';

import { ResetPasswordComponent } from '@app/features/login/reset-password/reset-password.component';
import { ForgottenPasswordComponent } from '@app/features/login/forgotten-password/forgotten-password.component';
import { LoginComponent } from '@app/features/login/login.component';

import { ForgottenPasswordService } from '@app/features/login/forgotten-password/forgotten-password.service';
import { ResetPasswordService } from '@app/features/login/reset-password/reset-password.service';
import { FieldsService } from '@app/features/login/fields.service';
import { LoginService } from '@app/features/login/login.service';

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, LoginRoutingModule],
  exports: [LoginRoutingModule],
  declarations: [
    LoginComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent
  ],
  providers: [
    FieldsService,
    LoginService,
    ForgottenPasswordService,
    ResetPasswordService
  ]
})
export class LoginModule {}
