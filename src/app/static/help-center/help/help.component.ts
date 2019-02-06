import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Titled } from '@app/shared/head/titled';
import { HelpCenterService } from '@app/static/help-center/help-center.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html'
})
export class HelpComponent implements OnInit {
  titles: Titled[];
  logoClasses: string;
  backgroundImageUrl: string;

  constructor(
    private helpCenterService: HelpCenterService,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.logoClasses = 'logo logo-small logo-white';
    this.titles = [new Titled('Ayuda', 'h3 white', 'text')];
    this.backgroundImageUrl = this.helpCenterService.getBackgroundImage();
    // Twitter cards
    this.loadTwitterCards();
    // Opengraph
    this.loadOpenGraph();
    window.FirebasePlugin.setScreenName("HELP");
  }

  loadTitle(): void {
    // this.titleService.setTitle('Ayuda | quizvideo');
  }

  loadTwitterCards(): void {
    this.meta.updateTag({ name: 'title', content: 'Ayuda | quizvideo' });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Ayuda | quizvideo'
    }); // this.titleService.getTitle()
    this.meta.updateTag({
      name: 'twitter:url',
      content: 'https://quizvideo.com/help'
    });
  }

  loadOpenGraph(): void {
    this.meta.updateTag({ name: 'og:title', content: 'Ayuda | quizvideo' }); // this.titleService.getTitle()
    this.meta.updateTag({
      name: 'og:url',
      content: 'https://quizvideo.com/help'
    });
  }
}
