import { FieldBase } from '@app/shared/forms/field-base/field-base.module';

export class Dropdown extends FieldBase<string> {
  controlType = 'dropdown';

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
