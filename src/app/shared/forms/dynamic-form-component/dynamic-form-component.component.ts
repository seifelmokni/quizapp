import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormSettings } from '@app/shared/forms/form-settings';
import { FieldControlService } from '@app/shared/forms/field-control.service';

@Component({
  selector: 'app-dynamic-form-component',
  templateUrl: './dynamic-form-component.component.html'
})
export class DynamicFormComponentComponent implements OnInit {
  @Input() formSettings: FormSettings;
  @Output() formData = new EventEmitter<any>();
  form: FormGroup;
  payLoad = '';

  constructor(private fieldControlService: FieldControlService) { }

  ngOnInit() {
    this.form = this.fieldControlService.toFormGroup(this.formSettings.fields);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.validateAllFormFields(this.form);
      return;
    }

    this.payLoad = JSON.stringify(this.form.value);
    this.formData.emit(this.form.value);
    this.form.reset();
  }

}
