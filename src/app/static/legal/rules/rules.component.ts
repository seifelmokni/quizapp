import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Titled } from '@app/shared/head/titled';
import { LegalService } from '@app/static/legal/legal.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html'
})
export class RulesComponent implements OnInit {
  logoClasses: string;
  titles: Titled[];
  backgroundImageUrl: string;

  constructor(private legalService: LegalService, private meta: Meta, private titleService: Title) { }

  ngOnInit() {
    this.logoClasses = 'logo logo-small logo-white';
    this.titles = [ new Titled('Reglas', 'h3 white', 'text') ];
    this.backgroundImageUrl = this.legalService.getBackgroundImage();

    this.loadTitle();
    // Twitter cards
    this.loadTwitterCards();
    // Opengraph
    this.loadOpenGraph();
  }

  loadTitle(): void {
    this.titleService.setTitle('Reglas oficiales | quizvideo');
  }

  loadTwitterCards(): void {
    this.meta.updateTag({ name: 'title', content: this.titleService.getTitle() });
    this.meta.updateTag({ name: 'twitter:title', content: this.titleService.getTitle() });
    this.meta.updateTag({ name: 'twitter:url', content: 'https://quizvideo.com/reglas-oficiales' });
  }

  loadOpenGraph(): void {
    this.meta.updateTag({ name: 'og:title', content: this.titleService.getTitle() });
    this.meta.updateTag({ name: 'og:url', content: 'https://quizvideo.com/reglas-oficiales' });
  }

}
