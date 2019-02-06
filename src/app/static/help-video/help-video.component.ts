import { Component, OnInit } from '@angular/core';

import { Titled } from '@app/shared/head/titled';
import { HelpVideoService } from '@app/static/help-video/help-video.service';

@Component({
  selector: 'app-help-video',
  templateUrl: './help-video.component.html'
})
export class HelpVideoComponent implements OnInit {
  videoUrl: string;
  titles: Titled[];
  play: boolean;
  startVideoFrom: number;
  backgroundImageUrl: string;

  constructor(
    private helpVideoService: HelpVideoService
  ) {}

  ngOnInit() {
    this.backgroundImageUrl = 'assets/images/background.jpg';
    this.videoUrl = this.helpVideoService.getVideo();
    this.titles = [new Titled('QV', 'logo logo-small logo-white', 'logo')];
    this.play = false;

    // window.plugins.streamingMedia.playVideo(this.videoUrl);
    window.FirebasePlugin.setScreenName("Help Video");
  }

}
