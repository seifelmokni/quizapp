import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { HomeComponent } from '@app/static/home/home.component';
import { HelpCenterComponent } from '@app/static/help-center/help-center/help-center.component';

import { FaqComponent } from '@app/static/help-center/faq/faq.component';
import { HowtoGetPayedComponent } from '@app/static/help-center/howtogetpayed/howtogetpayed.component';
import { HowtoPlayComponent } from '@app/static/help-center/howtoplay/howtoplay.component';
import { HelpComponent } from '@app/static/help-center/help/help.component';

import { PrivacyComponent } from '@app/static/legal/privacy/privacy.component';
import { TermsComponent } from '@app/static/legal/terms/terms.component';
import { RulesComponent } from '@app/static/legal/rules/rules.component';

import { HelpVideoComponent } from '@app/static/help-video/help-video.component';

import { PageNotFoundComponent } from '@app/static/not-found/not-found.component';

import { LegalService } from '@app/static/legal/legal.service';
import { HelpCenterService } from '@app/static/help-center/help-center.service';
import { HelpVideoService } from '@app/static/help-video/help-video.service';
import { NotConnectedComponent } from './not-connected/not-connected.component';
import { SorteoComponent } from './sorteo/sorteo.component';
import { BasesComponent } from '@app/static/help-center/bases/bases.component';

@NgModule({
  imports: [SharedModule, StaticRoutingModule],
  exports: [StaticRoutingModule],
  declarations: [
    PageNotFoundComponent,
    HelpCenterComponent,
    FaqComponent,
    HowtoGetPayedComponent,
    HowtoPlayComponent,
    HomeComponent,
    HelpComponent,
    HelpVideoComponent,
    PrivacyComponent,
    TermsComponent,
    RulesComponent,
    NotConnectedComponent,
    SorteoComponent,
    BasesComponent
  ],
  providers: [LegalService, HelpCenterService, HelpVideoService]
})
export class StaticModule {}
