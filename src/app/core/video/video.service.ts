import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class VideoService {

  private videoTimeSubject = new Subject<any>();

  private localVideoCounterInterval: any;

  constructor() {}

    /**
   * Starts the Local Timer
   *
   * @private
   * @param {number} start
   * @memberof TimerService
   */
  public startVideoTime(videoTime: number): void {
    this.localVideoCounterInterval = setInterval(() => {
      this.setVideoTime(videoTime);
      videoTime = videoTime + 1000;
    }, 1000);
  }

  /**
   * Stops the local timer
   *
   * @private
   * @memberof TimerService
   */
  public stopVideoTime(): void {
    clearInterval(this.localVideoCounterInterval);
  }

  /**
   * Get the videoTime
   *
   * @returns {Observable<number>}
   * @memberof VideoService
   */
  public getVideoTime(): Observable<number> {
    return this.videoTimeSubject.asObservable();
  }

  /**
   * Set the videoTime
   *
   * @param {number} time
   * @memberof VideoService
   */
  public setVideoTime(time: number): void {
    this.videoTimeSubject.next(time);
  }
}
