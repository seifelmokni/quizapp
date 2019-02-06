import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { LoaderState } from './loader-state';

@Injectable()
export class LoaderService {
  private loaderSubject: Subject<LoaderState> = new Subject<LoaderState>();
  public loaderState: Observable<LoaderState> = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next({show: true});
  }

  hide() {
    this.loaderSubject.next({show: false});
  }

}
