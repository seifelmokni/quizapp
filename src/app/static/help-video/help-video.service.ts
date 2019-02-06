import { Injectable } from '@angular/core';

@Injectable()
export class HelpVideoService {
  private videoUrl: string;

  constructor() {
    this.setVideo(
      'https://d3abqggomwgysp.cloudfront.net/promo-video/index.m3u8'
    );
  }

  getVideo(): string {
    return this.videoUrl;
  }

  setVideo(videoUrl: string): void {
    this.videoUrl = videoUrl;
  }
}
