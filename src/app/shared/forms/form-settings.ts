import { FieldBase } from './field-base/field-base.module';

export interface FormSettings {
  fields: FieldBase<any>[];
  formClasses: string;
  submitText: string;
}
