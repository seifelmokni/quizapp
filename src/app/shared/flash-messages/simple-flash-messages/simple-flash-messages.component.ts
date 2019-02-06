import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';

@Component({
  selector: 'app-simple-flash-messages',
  templateUrl: './simple-flash-messages.component.html',
  styleUrls: ['./simple-flash-messages.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({
          transform: 'translateY(-100%)',
          opacity: 0
        }),
        group([
          animate('1s ease', style({
            transform: 'translateY(0)',
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('1s ease', style({
            transform: 'translateY(-100%)',
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class SimpleFlashMessagesComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit() {}
}
