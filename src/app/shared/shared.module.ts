import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FloatingBgModule } from '@app/shared/floating-bg/floating-bg.module';
import { LoaderModule } from '@app/shared/loader/loader.module';
import { SocialsModule } from '@app/shared/socials/socials.module';
import { DynamicFormModule } from '@app/shared/forms/dynamic-form.module';
import { HeadComponent } from '@app/shared/head/head.component';
import { FloatingBgComponent } from '@app/shared/floating-bg/floating-bg/floating-bg.component';
import { LoaderComponent } from '@app/shared/loader/loader.component';
import { SocialsComponent } from '@app/shared/socials/socials.component';
import { NavbarModule } from '@app/shared/navbar/navbar.module';
import { StreamVideoComponent } from '@app/shared/stream-video/stream-video.component';
import { PipesModule } from '@app/shared/pipes/pipes.module';
import { FlashMessagesModule } from '@app/shared/flash-messages/flash-messages.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    FlashMessagesModule,
    FloatingBgModule,
    LoaderModule,
    DynamicFormModule,
    FloatingBgModule,
    NavbarModule,
    SocialsModule,
    PipesModule,
    LoaderModule
  ],
  declarations: [
    StreamVideoComponent,
    HeadComponent
  ],
  exports: [
    CommonModule,
    FormsModule,

    LoaderModule,
    DynamicFormModule,
    FlashMessagesModule,
    FloatingBgModule,
    SocialsModule,
    StreamVideoComponent,
    PipesModule,

    HeadComponent,
    NavbarModule,
    FloatingBgComponent,
    LoaderComponent,
    SocialsComponent
  ],
  providers: []
})
export class SharedModule {}
