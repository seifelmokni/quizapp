import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from '@app/shared/flash-messages/flash-messages.service';
import { FlashMessageItem } from '@app/shared/flash-messages/model/flash-message-item';
import { SimpleFlashMessagesComponent } from '@app/shared/flash-messages/simple-flash-messages/simple-flash-messages.component';

declare var Hls;

@Injectable()
export class StreamVideoService {
  private _video: HTMLVideoElement;
  private hls: any;

  constructor(
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) {}

  get video(): HTMLVideoElement {
    return this._video;
  }

  set video(value: HTMLVideoElement) {
    this._video = value;
  }

  public loadVideoData(
    video: HTMLVideoElement,
    url: string
  ): Promise<any> {
    this.video = video;

    this.video.controls = false;
    this.video.loop = false;

    const promise = new Promise<any>((resolve, reject) => {
      if (Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(url);
        this.hls.attachMedia(this.video);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.video
            .play()
            .then(() => {
              resolve();
            })
            .catch(err => {
              console.warn('Your browser does not support HTTP LIVE STREAM.');
              // console.error(err);
              // JP - 2018/07/13: see if we can show user friendly message to users not handling streaming
              // this.flashMessagesService.setMessage(
              //   new FlashMessageItem(SimpleFlashMessagesComponent, {
              //     message:
              //       'Disculpas, parece que tu navegador no es compatible con este juego.'
              //   })
              // );
              // this.router.navigate(['/profile']);
            });
        });
      } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
        this.video.src = url + '?scr=qvapp';
        this.video.addEventListener('loadedmetadata', () => {
          this.video
            .play()
            .then(() => {
              resolve();
            })
            .catch(err => {
              console.warn('Your browser does not support HTTP LIVE STREAM.');
              // console.error(err);
              // JP - 2018/07/13: see if we can show user friendly message to users not handling streaming
              // this.flashMessagesService.setMessage(
              //   new FlashMessageItem(SimpleFlashMessagesComponent, {
              //     message:
              //       'Disculpas, parece que tu navegador no es compatible con este juego.'
              //   })
              // );
              // this.router.navigate(['/profile']);
            });
        });
      }
    });

    return promise;
  }

  private syncVideoTime(startFrom: number): void {
    this.video.currentTime = startFrom;
  }

  public syncVideo(startVideoFrom: number): void {
    const startFrom = startVideoFrom / 1000 || 0;

    if (!this.video) {
      return;
    }

    if (this.video.currentTime === startFrom) {
      // Video is in sync.
      return;
    }

    this.syncVideoTime(startFrom);
  }

  public preventUntrustedUsage(): void {
    if (this.video.controls === true || this.video.loop === true) {
      this.video.controls = false;
      this.video.loop = false;
    }
  }

  public disableSeeking(supposedCurrentTime: number): void {
    const delta = this.video.currentTime - supposedCurrentTime;
    if (Math.abs(delta) > 0.01) {
      if (this.video.seeking) {
        this.video.currentTime = supposedCurrentTime;
      }
    }
  }
}
