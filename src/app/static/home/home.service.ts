import { Injectable } from '@angular/core';
import { Message } from '@app/shared/head/message';

@Injectable()
export class HomeService {
  private homeMessages: Message[];

  constructor() {
    this.homeMessages = [
      new Message('Trivia en directo', 'h5 white medium'),
      new Message('Juega y gana hasta 100 € cada día.', 'h5 white')
    ];
  }

  public getBackgroundImage(): string {
    return 'assets/images/background.jpg';
  }

  public getMessage(): Message[] {
    return this.homeMessages;
  }
}
