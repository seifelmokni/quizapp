import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFlashMessages]'
})
export class FlashMessagesDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}

}
