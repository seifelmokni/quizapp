import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { LogglyService } from 'ngx-loggly-logger';
import { UserService } from '@app/features/user/services/user.service';
import { User } from '@app/domain';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  user: User;

  constructor(
    private _logglyService: LogglyService,
    private userService: UserService
  ) {
    if (env.production) {
      this._logglyService.push({
        logglyKey: '17784d19-a0cc-458a-89f8-439b93d11758',
        sendConsoleErrors : true, // Optional set true to send uncaught console errors
        tag : 'loggly-logger'
      });
    }
    this.userService.user$.subscribe(data => this.user = data);
  }

  /**
   * Send a log trace to loggly-logger
   *
   * @param {string} message
   * @memberof LoggerService
   */
  public log (label, message: string) {
    label = (label) ? label : 'info';
    const msg = 'env:' + env.envName + ';type:' + label + ';uid:'
      + this.user.id + ';username:' + this.user.username + ';message:' + message;
    if (env.production) {
      this._logglyService.push(msg);
      return;
    }
    console.log(msg);
  }
}
