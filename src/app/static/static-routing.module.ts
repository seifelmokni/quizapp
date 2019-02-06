import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpCenterComponent } from '@app/static/help-center/help-center/help-center.component';
import { FaqComponent } from '@app/static/help-center/faq/faq.component';
import { HowtoPlayComponent } from '@app/static/help-center/howtoplay/howtoplay.component';
import { HowtoGetPayedComponent } from '@app/static/help-center/howtogetpayed/howtogetpayed.component';
import { HelpComponent } from '@app/static/help-center/help/help.component';
import { PrivacyComponent } from '@app/static/legal/privacy/privacy.component';
import { TermsComponent } from '@app/static/legal/terms/terms.component';
import { RulesComponent } from '@app/static/legal/rules/rules.component';
import { HomeComponent } from '@app/static/home/home.component';
import { HelpVideoComponent } from '@app/static/help-video/help-video.component';
import { SorteoComponent } from '@app/static/sorteo/sorteo.component';
import { BasesComponent } from '@app/static/help-center/bases/bases.component';

const staticRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'help-video',
    component: HelpVideoComponent
  },
  {
    path: 'help',
    component: HelpCenterComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'como-jugar',
    component: HowtoPlayComponent
  },
  {
    path: 'como-cobro',
    component: HowtoGetPayedComponent
  },
  {
    path: 'ayuda',
    component: HelpComponent
  },
  {
    path: 'politica-de-privacidad',
    component: PrivacyComponent
  },
  {
    path: 'terminos-y-condiciones',
    component: TermsComponent
  },
  {
    path: 'reglas-oficiales',
    component: RulesComponent
  },
  {
    path: 'bases-sorteo',
    component: BasesComponent
  },
  {
    path: 'sorteo',
    component: SorteoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(staticRoutes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
