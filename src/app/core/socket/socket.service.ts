import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { environment } from '@env/environment';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';
import { ConnectionHandlerService } from './connection-handler.service';

/**
 * Socket Service
 *
 * @export
 * @class SocketService
 */
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: SocketIOClient.Socket = io(environment.socketUrl, {
    transports: ['websocket'],
    upgrade: false,
    autoConnect: true
  });

  /**
   * Socket Service.
   *
   * @memberof SocketService
   */
  constructor(
    private connectionHandlerService: ConnectionHandlerService,
  ) {}

  /**
   * Connect to the Socket Manager
   *
   * @returns {boolean}
   * @memberof SocketService
   */
  public connect(): boolean {
    let connected = false;
    if (!this.socket.connected) {
      this.socket.open();
      this.connectionHandlerService.setSocket(this.socket);
      connected = true;
    }
    return connected;
  }

  /**
   * Connect to the Socket Manager
   *
   * @memberof SocketService
   */
  public disconnect() {
    if (this.socket.connected) {
      this.socket.close();
    }
  }

  /**
   * Socket is connected
   *
   * @returns {boolean}
   * @memberof SocketService
   */
  public isConnected(): boolean {
    return this.socket.connected;
  }

  /**
   * Send User Auth Token to Game Server
   *
   * @param {number} userId
   * @memberof SocketService
   */
  public sendAuth(token: string): void {
    this.socket.emit('auth', token );
  }

  /**
   * Emits the user answer
   *
   * @param {*} answer
   * @memberof SocketService
   * @see sendAnswer
   */
  public sendAnswer(answerId: number, useLife: boolean): void {
    if (useLife) {
      this.socket.send({ type: 'answer', answerId: answerId, useLife: true });
      return;
    }
    this.socket.send({ type: 'answer', answerId: answerId });
  }

  /**
   * Observes the messages incoming from the socket server
   *
   * @returns {Observable<any>}
   * @memberof SocketService
   */
  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on('message', (res: any) => {
        observer.next(res);
      });
    });
  }

}
