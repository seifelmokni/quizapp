import { Injectable } from '@angular/core';

@Injectable()
export class ShowTimeService {
  private bgImage: string;
  private gameAvailable: boolean;
  private canUserPlay: boolean;

  // TODO: It's going to be deprecated

  constructor() {
    this.setBgImage('assets/images/backgrounds/counter.jpg');
    this.gameAvailable = false;
  }

  private setBgImage(img: string): void {
    this.bgImage = img;
  }

  public getBgImage(): string {
    return this.bgImage;
  }

  public getGameAvailable(): boolean {
    return this.gameAvailable;
  }

  public setGameAvailable(value: boolean): void {
    this.gameAvailable = value;
  }

  public getCanUserPlay(): boolean {
    return this.canUserPlay;
  }

  public setCanUserPlay(value: boolean): void {
    this.canUserPlay = value;
  }
}
