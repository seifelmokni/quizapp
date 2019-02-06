import { FieldBase } from '@app/shared/forms/field-base/field-base.module';

export class TextBox extends FieldBase<string> {
    controlType = 'textbox';
    type: string;
    message: string;

    constructor(options: {} = {}) {
      super(options);
      this.type = options['type'] || '';
      this.message = options['message'] || '';
    }
}
