import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment as env } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  location: Location;

  ngOnInit() {

  }
}