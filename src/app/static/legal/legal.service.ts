import { Injectable } from '@angular/core';

@Injectable()
export class LegalService {

  constructor() { }

  public getBackgroundImage(): string {
    return 'assets/images/background.jpg';
  }
}
