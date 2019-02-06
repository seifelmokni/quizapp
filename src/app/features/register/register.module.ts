import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { RegisterRoutingModule } from '@app/features/register/register-routing.module';
import { RegisterComponent } from '@app/features/register/register.component';
import { FieldsService } from '@app/features/register/fields.service';
import { RegisterService } from '@app/features/register/register.service';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule
  ],
  exports: [RegisterRoutingModule],
  declarations: [RegisterComponent],
  providers: [FieldsService, RegisterService]
})
export class RegisterModule {}
