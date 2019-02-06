import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from './loader.service';
import { LoaderState } from './loader-state';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscriptions: Subscription;

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.subscriptions = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
