import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy
} from '@angular/core';
import { FlashMessageItem } from '@app/shared/flash-messages/model/flash-message-item';
import { FlashMessagesDirective } from '@app/shared/flash-messages/flash-messages.directive';
import { FlashMessage } from '@app/shared/flash-messages/model/flash-message';

import { FlashMessagesService } from '@app/shared/flash-messages/flash-messages.service';

@Component({
  selector: 'app-flash-messages',
  templateUrl: './flash-messages.component.html'
})
export class FlashMessagesComponent implements OnInit {
  message: FlashMessageItem;
  timeout: any;
  @ViewChild(FlashMessagesDirective)
  messageHost: FlashMessagesDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.flashMessagesService.setMessage = this.setMessage.bind(this);
  }

  loadComponent() {
    if (!this.message) {
      return;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.message.component
    );

    const viewContainerRef = this.messageHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<FlashMessage>componentRef.instance).data = this.message.data;
  }

  setMessage(message: FlashMessageItem): void {
    this.message = message;
    this.loadComponent();
    this.timeout = setTimeout(() => {
      this.message = null;
      this.messageHost.viewContainerRef.remove();
      clearTimeout(this.timeout);
    }, 5000);
  }
}
