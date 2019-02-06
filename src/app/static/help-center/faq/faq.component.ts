import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Titled } from '@app/shared/head/titled';
import { HelpCenterService } from '@app/static/help-center/help-center.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {
  logoClasses: string;
  titles: Titled[];
  backgroundImageUrl: string;

  constructor(private helpCenterService: HelpCenterService, private meta: Meta, private titleService: Title) { }

  ngOnInit() {
    this.logoClasses = 'logo logo-small logo-white';
    this.titles = [ new Titled('FAQ', 'h3 white', 'text') ];
    this.backgroundImageUrl = this.helpCenterService.getBackgroundImage();
    this.loadTitle();
    // Twitter cards
    this.loadTwitterCards();
    // Opengraph
    this.loadOpenGraph();
    window.FirebasePlugin.setScreenName("FAQ");
  }

  loadTitle(): void {
    this.titleService.setTitle('FAQ | quizvideo');
  }

  loadTwitterCards(): void {
    this.meta.updateTag({ name: 'title', content: this.titleService.getTitle()});
    this.meta.updateTag({ name: 'twitter:title', content: this.titleService.getTitle()});
    this.meta.updateTag({ name: 'twitter:url', content: 'https://quizvideo.com/faq' });
  }

  loadOpenGraph(): void {
    this.meta.updateTag({ name: 'og:title', content: this.titleService.getTitle()});
    this.meta.updateTag({ name: 'og:url', content: 'https://quizvideo.com/faq' });
  }

}
