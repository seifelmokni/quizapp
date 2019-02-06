import {
  Component,
  OnInit,
  ViewChild,
  DoCheck,
  Input,
  OnDestroy,
  OnChanges
} from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from '@app/shared/flash-messages/flash-messages.service';
import { FlashMessageItem } from '@app/shared/flash-messages/model/flash-message-item';
import { SimpleFlashMessagesComponent } from '@app/shared/flash-messages/simple-flash-messages/simple-flash-messages.component';
import { StreamVideoService } from '@app/core/stream/stream-video.service';


@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html'
})
export class StreamVideoComponent
  implements OnInit, OnChanges, DoCheck, OnDestroy {
  supposedCurrentTime = 0;
  ableSeeking: boolean;
  videoEnded: boolean;
  handleEndOfTheVideo: any;
  @Input()
  videoUrl: string;
  @Input()
  startVideoFrom: number;
  @Input()
  isLive: boolean;
  @ViewChild('videoPlayer')
  videoplayer: any;

  constructor(
    private streamVideoService: StreamVideoService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.ableSeeking = false;
    this.videoEnded = false;
    this.playVideo();
    this.syncVideo();
  }

  ngOnChanges(): void {
    this.ableSeeking = true;
    this.syncVideo();
  }

  ngDoCheck(): void {
    if (this.isLive) {
      this.streamVideoService.preventUntrustedUsage();
    }
  }

  ngOnDestroy(): void {
    this.videoplayer.nativeElement.src = '';
    this.clearEndOfTheVideoTimeout();
  }

  syncVideo(): void {
    this.streamVideoService.syncVideo(this.startVideoFrom);
  }

  playVideo(): void {
    this.streamVideoService
      .loadVideoData(
        this.videoplayer.nativeElement,
        this.videoUrl
      )
      .then(() => {
        this.streamVideoService.syncVideo(this.startVideoFrom);
      })
      .catch(err => {
        console.warn('Your browser does not support HTTP LIVE STREAM.');
        // console.error(err);

        // If we goes back in a javascript way like history.go(-1) throws an error, FIXME
        // Atm is better if user refresh the page on video freeze going back, since it's a user problem
        // this.flashMessagesService.setMessage(
        //   new FlashMessageItem(SimpleFlashMessagesComponent, {
        //     message:
        //       'Tu navegador no es compatible con streaming de video.'
        //   })
        // );
        // this.router.navigate(['/profile']);
      });
  }

  handleSeeking(): void {
    if (!this.isLive || this.videoEnded) {
      return;
    }

    if (this.videoplayer.nativeElement.seeking && this.ableSeeking) {
      this.ableSeeking = false;
      return;
    } else {
      this.streamVideoService.disableSeeking(this.supposedCurrentTime);
    }
  }

  handleTimeupdate(): void {
    if (!this.videoplayer.nativeElement.seeking && this.isLive) {
      this.supposedCurrentTime = this.videoplayer.nativeElement.currentTime;
    }
  }

  clearEndOfTheVideoTimeout(): void {
    if (!this.handleEndOfTheVideo) {
      return;
    }

    clearTimeout(this.handleEndOfTheVideo);
  }

  handleEnded(): void {
    if (this.isLive) {
      this.handleEndOfTheVideo = setTimeout(() => {
        this.flashMessagesService.setMessage(
          new FlashMessageItem(SimpleFlashMessagesComponent, {
            message: 'Disculpas, parece que algo fue mal :('
          })
        );
        this.router.navigate(['/profile']);
      }, 10000);
    }
  }
}
