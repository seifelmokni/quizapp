import { NgModule } from '@angular/core';
import { TrimHtmlPipe } from './trim-html.pipe';
import { TruncatePipe } from './truncate.pipe';
import { YoutubeEmbedUrlPipe } from './youtube-embed-url.pipe';
import { VimeoEmbedUrlPipe } from './vimeo-embed-url.pipe';
import { LocalDatePipe } from './local-date.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { SplitPipe } from './split.pipe';
import { RoundPipe } from './round.pipe';
import { TrimHttpPipe } from './trim-http.pipe';

@NgModule({
  declarations: [
    TruncatePipe,
    TrimHtmlPipe,
    TrimHttpPipe,
    SplitPipe,
    RoundPipe,
    YoutubeEmbedUrlPipe,
    VimeoEmbedUrlPipe,
    LocalDatePipe,
    CapitalizePipe
  ],
  exports: [
    TruncatePipe,
    TrimHtmlPipe,
    TrimHttpPipe,
    SplitPipe,
    RoundPipe,
    YoutubeEmbedUrlPipe,
    VimeoEmbedUrlPipe,
    LocalDatePipe,
    CapitalizePipe
  ]
})
export class PipesModule {}
