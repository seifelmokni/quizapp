import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldBase } from '@app/shared/forms/field-base/field-base.module';
import { InputHidden } from '@app/shared/forms/input-hidden/input-hidden.module';
import { TextBox } from '@app/shared/forms/textbox/textbox.module';
import { CheckBox } from '@app/shared/forms/checkbox/checkbox.module';

@Injectable()
export class FieldsService {
  private fields: FieldBase<any>[];
  constructor() {}

  getFields(): FieldBase<any>[] {
    this.fields = [
      new InputHidden({
        key: 'refferal_user_id',
        label: null,
        type: 'hidden',
        value: null, // refferal_user_id parameter from the url
        order: 0
      }),
      new TextBox({
        key: 'username',
        label: null,
        placeholder: 'Username',
        type: 'text',
        value: null,
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(35)
        ],
        order: 1
      }),
      new TextBox({
        key: 'email',
        label: null,
        placeholder: 'Email',
        type: 'email',
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          Validators.maxLength(35)
        ],
        order: 2
      }),
      new TextBox({
        key: 'password',
        label: null,
        placeholder: 'Password',
        type: 'password',
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(35)
        ],
        order: 3
      }),
      new CheckBox({
        key: 'terms_and_conditions',
        label: null,
        customContent: 'I agree with the Terms and Conditions',
        type: 'checkbox',
        validators: [Validators.requiredTrue],
        order: 4
      }),
      new CheckBox({
        key: 'provide_email',
        label: null,
        customContent: 'Provide email',
        type: 'checkbox',
        validators: [Validators.requiredTrue],
        order: 5
      })
    ];

    return this.fields.sort((a, b) => a.order - b.order);
  }
}
