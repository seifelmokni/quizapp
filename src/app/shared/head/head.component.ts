import { Component, OnInit, Input } from '@angular/core';
import { Social } from '@app/shared/socials/social';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Titled } from '@app/shared/head/titled';
import { Message } from '@app/shared/head/message';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html'
})
export class HeadComponent implements OnInit {
  @Input() logoClasses: string;
  @Input() titles: Titled[];
  @Input() subtitles: Titled[];
  @Input() socials: Social[];
  @Input() messages: Message[];
  @Input() goback: boolean;
  @Input() help: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {}

  goBack() {
    if (this.router.url.includes('game-results')) {
      this.router.navigate(['/profile']);
      return;
    }
    this.location.back();
  }

  goHelp() {
    this.router.navigate(['/help']);
  }
}
