import { Type } from '@angular/core';

export class FlashMessageItem {
  constructor(public component: Type<any>, public data: any) {}
}
