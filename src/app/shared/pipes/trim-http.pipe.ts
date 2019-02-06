import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimHttp'
})
export class TrimHttpPipe implements PipeTransform {
  public transform(value: string): string {
    return this.urlWithoutHttp(value);
  }

  private urlWithoutHttp(url: string): string {
    return String(url).replace(/(^\w+:|^)\/\//, '');
  }
}
