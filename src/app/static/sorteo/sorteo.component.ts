import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorteo',
  templateUrl: './sorteo.component.html',
  styleUrls: ['./sorteo.component.scss']
})
export class SorteoComponent implements OnInit {
  backgroundImageUrl: string;
  constructor() {}

  ngOnInit() {
    this.backgroundImageUrl = 'assets/images/background.jpg';
  }
}
