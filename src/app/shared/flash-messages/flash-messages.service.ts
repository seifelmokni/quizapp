import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { FlashMessageItem } from './model/flash-message-item';
import { SimpleFlashMessagesComponent } from '@app/shared/flash-messages/simple-flash-messages/simple-flash-messages.component';

@Injectable()
export class FlashMessagesService {
  private message: FlashMessageItem;
  constructor() {}

  public setMessage(message: FlashMessageItem): void {
    this.message = message;
  }

  public getMessage(): FlashMessageItem {
    return this.message;
  }

  public sendMessage(message) {
    this.setMessage(
      new FlashMessageItem(SimpleFlashMessagesComponent, {
        message: message
      })
    );
  }
}
