import { Injectable } from '@angular/core';
import { FieldBase } from './field-base/field-base.module';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable()
export class FieldControlService {

  constructor() { }

  toFormGroup(fields: FieldBase<any>[]) {
    const group: any = {};

    fields.forEach((field) => {
      group[field.key] = field.validators ?
        new FormControl(field.value || '', field.validators) :
        new FormControl(field.value || '');
    });

    return new FormGroup(group);
  }
}
