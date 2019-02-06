import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponentComponent } from './dynamic-form-component/dynamic-form-component.component';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';
import { FieldControlService } from './field-control.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DynamicFormComponentComponent, DynamicFormFieldComponent],
  declarations: [DynamicFormComponentComponent, DynamicFormFieldComponent],
  providers: [FieldControlService]
})
export class DynamicFormModule {}
