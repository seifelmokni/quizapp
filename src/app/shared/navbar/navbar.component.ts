import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Titled } from '@app/shared/head/titled';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  @Input()
  logoClasses: string;
  @Input()
  titles: Titled[];
  @Input()
  goback: boolean;
  @Input()
  help: boolean;

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  goHelp() {
    this.router.navigate(['/help']);
  }
}
