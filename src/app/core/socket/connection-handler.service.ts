import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from '../storage/local-storage.service';
import { LoggerService } from '../logger/logger.service';
import { Location } from '@angular/common';

@Injectable()
export class ConnectionHandlerService {

  constructor(
    private loggerService: LoggerService,
    private location: Location
  ) {}

  private socket: SocketIOClient.Socket;

  setSocket(socket: SocketIOClient.Socket) {
    this.socket = socket;
    this.handleConnection();
  }

  private onConnectError(): Observable<any> {
    const observable = new Observable<any>((observer) => {
      this.socket.on('connect_error', (err) => {
        observer.next(err);
      });

      return () => {
        this.socket.off('connect_error', null);
      };
    });

    return observable;
  }

  private onError(): Observable<any> {
    const observable = new Observable<any>((observer) => {
      this.socket.on('error', (err) => {
        observer.next(err);
      });

      return () => {
        this.socket.off('error', null);
      };
    });

    return observable;
  }

  private onReconnect(): Observable<any> {
    const observable = new Observable<any>((observer) => {
      this.socket.on('reconnect', (err) => {
        observer.next(err);
      });

      return () => {
        this.socket.off('reconnect', null);
      };
    });

    return observable;
  }

  private onReconnectAttempt(): Observable<any> {
    const observable = new Observable<any>((observer) => {
      this.socket.on('reconnect_attempt', (err) => {
        observer.next(err);
      });

      return () => {
        this.socket.off('reconnect_attempt', null);
      };
    });

    return observable;
  }

  private onReconnecting(): Observable<any> {
    const observable = new Observable<any>((observer) => {
      this.socket.on('reconnecting', (data: any) => {
        observer.next(data);
      });

      return () => {
        this.socket.off('reconnecting', null);
      };
    });

    return observable;
  }

  private onReconnectError(): Observable<any> {
    const observable = new Observable<any>((observer) => {
      this.socket.on('reconnect_error', (err) => {
        observer.next(err);
      });

      return () => {
        this.socket.off('reconnect_error', null);
      };
    });

    return observable;
  }

  private onReconnectFailed(): Observable<any> {
    const observable = new Observable<any>((observer) => {
      this.socket.on('reconnect_failed', (data: any) => {
        observer.next(data);
      });

      return () => {
        this.socket.off('reconnect_failed', null);
      };
    });

    return observable;
  }

  private handleConnection(): void {

    this.onConnectError().subscribe((data: any) => {
      this.loggerService.log('error', 'Socket onConnectError:' + JSON.stringify(data));
    });
    this.onError().subscribe((data: any) => {
      this.loggerService.log('error', 'Socket onError:' + JSON.stringify(data));
    });
    this.onReconnect().subscribe((data: any) => {
      this.loggerService.log('warning', 'Socket onReconnect:' + JSON.stringify(data));
    });
    this.onReconnectAttempt().subscribe((data: any) => {
      // JP: 20181113: https://socket.io/docs/client-api/
      // on reconnection, reset the transports option, as the Websocket
      // connection may have failed (caused by proxy, firewall, browser, ...)
      this.socket.io.opts.transports = ['polling', 'websocket'];
    });
    this.onReconnecting().subscribe((data: any) => {
      this.loggerService.log('warning', 'Socket onReconnecting:' + JSON.stringify(data));
    });
    this.onReconnectError().subscribe((data: any) => {
      this.loggerService.log('error', 'Socket onReconnectError:' + JSON.stringify(data));
      this.location.go('/profile');
    });
    this.onReconnectFailed().subscribe((data: any) => {
      this.loggerService.log('error', 'Socket onReconnectFailed:' + JSON.stringify(data));
    });
  }
}
