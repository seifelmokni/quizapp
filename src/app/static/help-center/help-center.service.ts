import { Injectable } from '@angular/core';

@Injectable()
export class HelpCenterService {

  constructor() { }

  public getBackgroundImage(): string {
    return 'assets/images/background.jpg';
  }
}
