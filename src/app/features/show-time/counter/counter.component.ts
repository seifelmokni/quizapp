import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
  @Input()
  time: string;
  @Input()
  usersCount: number;

  constructor() {}

  ngOnInit() {}
}
