import { ValidatorFn } from '@angular/forms';
import { AbstractControlOptions } from '@angular/forms/src/model';

export class FieldBase<T> {
  type: string;
  value: T;
  key: string;
  label: string;
  placeholder: string;
  options: {
    key: string,
    value: string
  }[];
  validators: ValidatorFn | ValidatorFn[] | AbstractControlOptions;
  order: number;
  controlType: string;

  constructor(options) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.validators = options.validators;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}
