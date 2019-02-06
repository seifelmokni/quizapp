import { Injectable } from '@angular/core';

@Injectable()
export class QuizHeadService {
  private headClasses: string;
  private usersCount: number;

  constructor() {}

  /**
   * Return the head classes
   */
  public getHeadClassess(): string {
    return this.headClasses;
  }

  /**
   * This method is binded to the quiz head component.
   * @param value Takes a string of classes
   */
  public setHeadClasses(value: string) {}

  /**
   * This method is binded to the quiz head component.
   * @param value Takes a string of the image
   */
  public setLogo(value: string) {}

  /**
   * Return the head classes
   */
  public getUsersCount(): number {
    return this.usersCount;
  }

  /**
   * This method is binded to the quiz head component.
   * It is used to set the users count.
   * @param value Takes a string of classes
   */
  public setUsersCount(value: number) {}

  /**
   * This method is binded to the quiz head component.
   * It is used to set the extra lives count.
   * @param value Takes a string of classes
   */
  public setExtraLives(value: number) {}
}
