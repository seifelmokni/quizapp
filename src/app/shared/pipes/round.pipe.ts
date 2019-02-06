import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {
  transform(value) {
    if (!value) {
      return 0;
    }
    const valueRounded = Math.round(value);
    return valueRounded;
  }
}
