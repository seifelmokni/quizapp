import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {
  transform(value: string, separator: string): string {
    if (!value) {
      return value;
    }
    const string = value.split(separator);
    return (string[0] !== '') ? string[0] : (string[1]) ? string[1] : '';
  }
}
