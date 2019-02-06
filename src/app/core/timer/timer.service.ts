import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  // When a quiz starts fires the timer
  private timerSubject = new Subject<number>();

  private localCountdownInterval: any;

  /**
   * Starts the Local Timer
   *
   * @private
   * @param {number} start
   * @memberof TimerService
   */
  public startTimer(start: number): void {
    this.localCountdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const startTime = new Date(start).getTime();
      const time = (startTime - currentTime) - 1000;
      this.setTimer(time);
    }, 1000);
  }

  /**
   * Stops the local timer
   *
   * @private
   * @memberof TimerService
   */
  public stopTimer(): void {
    clearInterval(this.localCountdownInterval);
  }

  /**
   * Updates the Game State
   *
   * @private
   * @param {number} time
   * @memberof TimerService
   */
  private setTimer(time: number): void {
    this.timerSubject.next(time);
  }

  /**
   * Listen the timer changes
   *
   * @returns {Observable<number>}
   * @memberof TimerService
   */
  public getTimer(): Observable<number> {
    return this.timerSubject.asObservable();
  }
}
