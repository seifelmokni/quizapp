import { FieldBase } from '@app/shared/forms/field-base/field-base.module';


export class InputHidden extends FieldBase<string> {
    controlType = 'hidden';
    type: string;
    message: string;

    constructor(options: {} = {}) {
      super(options);
      this.type = options['type'] || '';
      this.message = options['message'] || '';
    }
}
