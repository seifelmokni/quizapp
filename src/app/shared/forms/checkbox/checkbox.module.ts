import { FieldBase } from '@app/shared/forms/field-base/field-base.module';

export class CheckBox extends FieldBase<boolean> {
    controlType = 'checkbox';
    customContent: string;
    type: string;

    constructor(options: {} = {}) {
      super(options);
      this.type = options['type'] || '';
      this.customContent = options['customContent'] || '';
    }
}
