import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Message } from '@app/shared/head/message';
import { FlashMessagesService } from '@app/shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  logoClasses: string;
  backgroundImageUrl: string;
  messages: Message[];
  deviceInfo = null;
  constructor(
    private titleService: Title,
    private meta: Meta,
    private deviceService: DeviceDetectorService,
    private flashMessageService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.logoClasses = 'logo logo-big logo-white';
    this.backgroundImageUrl = 'assets/images/background.jpg';
    this.messages = [
      new Message('Trivia en directo', 'h5 white medium'),
      new Message('Juega, DIVIÉRTETE y gana 100 € cada día. Y hasta 500 € los #jueveslocos', 'h5 white')
    ];
    // TODO Create a Social Metatags service
    // Reset the main meta tags at home page
    this.loadTitle();
    // Twitter cards
    this.loadTwitterCards();
    // Opengraph
    this.loadOpenGraph();
    // Device Check // FIXME
    this.getDeviceCheck();
    window.FirebasePlugin.setScreenName("Home");
  }

  loadTitle(): void {
    this.titleService.setTitle('Trivia en directo | quizvideo');
  }

  loadTwitterCards(): void {
    this.meta.updateTag({
      name: 'title',
      content: this.titleService.getTitle()
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: this.titleService.getTitle()
    });
    this.meta.updateTag({
      name: 'twitter:url',
      content: 'https://quizvideo.com/'
    });
  }

  loadOpenGraph(): void {
    this.meta.updateTag({
      name: 'og:title',
      content: this.titleService.getTitle()
    });
    this.meta.updateTag({ name: 'og:url', content: 'https://quizvideo.com/' });
  }

  getDeviceCheck() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if (
      this.deviceInfo.device === 'android' &&
      (this.deviceInfo.userAgent.indexOf('Android 6.') > 0 ||
        this.deviceInfo.userAgent.indexOf('Android 5.') > 0 ||
        this.deviceInfo.userAgent.indexOf('Android 4.') > 0 ||
        this.deviceInfo.userAgent.indexOf('Android 2.') > 0) // No 3. releases in Android
    ) {
      this.flashMessageService.sendMessage('Para mejorar la experiencia de usuario, ' +
      'le recomendamos que utilice un dispositivo con un sistema operativo Android 7 o superior.');
    }
    if (
      (this.deviceInfo.device === 'iphone' ||
        this.deviceInfo.device === 'ipad') &&
      (this.deviceInfo.userAgent.indexOf('9_') > 0 ||
        this.deviceInfo.userAgent.indexOf('8_') > 0 ||
        this.deviceInfo.userAgent.indexOf('7_') > 0 ||
        this.deviceInfo.userAgent.indexOf('6_') > 0 ||
        this.deviceInfo.userAgent.indexOf('5_') > 0) // 4 and 3 ? do they already exists?
    ) {
      this.flashMessageService.sendMessage('Para mejorar la experiencia de usuario, le recomendamos que utilice ' +
      'un dispositivo con un sistema operativo iOS 10 o superior.');
    }
  }
}
