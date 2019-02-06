import { Component, OnInit, Input } from '@angular/core';
import { Social } from './social';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html'
})
export class SocialsComponent implements OnInit {
  @Input() socialMedia: Social[];

  constructor() { }

  ngOnInit() {}

}
