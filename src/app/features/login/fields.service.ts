import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormSettings } from '@app/shared/forms/form-settings';
import { FieldBase } from '@app/shared/forms/field-base/field-base.module';
import { TextBox } from '@app/shared/forms/textbox/textbox.module';

@Injectable()
export class FieldsService {
  private formSettings: FormSettings;
  private fields: FieldBase<any>[];

  constructor() {
    this.formSettings = {
      fields: this.getFields(),
      formClasses: 'form login',
      submitText: 'Entrar'
    };
  }

  getFields(): FieldBase<any>[] {
    this.fields = [
      new TextBox({
        key: 'email',
        label: null,
        placeholder: 'Email',
        type: 'email',
        validators: [
          Validators.required,
          Validators.pattern('[^ @]*@[^ @]*'),
          Validators.maxLength(35)
        ],
        order: 1
      }),
      new TextBox({
        key: 'password',
        label: null,
        placeholder: 'Contraseña',
        type: 'password',
        message: '¿Olvidaste tu contraseña?',
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(35)
        ],
        order: 2
      })
    ];

    // .log('Dynamic Login Form Fields', this.fields);
    return this.fields.sort((a, b) => a.order - b.order);
  }

  getFormSettings(): FormSettings {
    return this.formSettings;
  }
}
