import { Component, OnInit, OnDestroy } from '@angular/core';
import { Titled } from '@app/shared/head/titled';

import { Message } from '@app/shared/head/message';

import { FlashMessagesService } from '@app/shared/flash-messages/flash-messages.service';
import { SimpleFlashMessagesComponent } from '@app/shared/flash-messages/simple-flash-messages/simple-flash-messages.component';
import { FlashMessageItem } from '@app/shared/flash-messages/model/flash-message-item';
import { UserService } from '@app/features/user/services/user.service';
import { UserApiResponse } from '@app/shared/api';
import { Subscription } from 'rxjs';

declare var ClipboardJS;

@Component({
  selector: 'app-extra-lifes',
  templateUrl: './extra-lifes.component.html'
})
export class ExtraLifesComponent implements OnInit, OnDestroy {
  titles: Titled[];
  messages: Message[];
  image: string;
  userId: number;
  url: string;
  extraLives: number;
  clipboard: any;

  private userAPISubscription: Subscription;

  constructor(
    private userService: UserService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    // Get the user data
    this.subscribeUserApi();
    this.titles = [new Titled('QV', 'logo logo-medium logo-white', 'logo')];
    this.messages = [new Message('¡Consigue comodines!', 'h4 white')];
    this.image = '';
    this.clipboard = new ClipboardJS('.btn.clipboard');
    console.log(this.url);
    window.FirebasePlugin.setScreenName("Extra life");
  }

  ngOnDestroy() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }

  /**
   * Subscribe to the API user data
   *
   * @memberof ExtraLifesComponent
   */
  subscribeUserApi(): void {
    // Obstants the current user info the first time
    this.userAPISubscription = this.userService.reqProfileInfo().subscribe((res: UserApiResponse) => {
      if (res.success) {
        this.userId = res.data.user.id;
        this.extraLives = res.data.user.extraLives;
        if (window.location.port) {
          this.url = `${window.location.protocol}//${window.location.hostname}:${
            window.location.port
          }/register/${btoa(this.userId.toString())}`;
        } else {
          this.url = `${window.location.protocol}//${window.location.hostname}/register/${btoa(
            this.userId.toString()
          )}`;
        }
        this.userAPISubscription.unsubscribe();
      }
    });
  }

  /**
   * Helper for callback message
   *
   * @memberof ExtraLifesComponent
   */
  copied(): void {
    this.flashMessagesService.setMessage(
      new FlashMessageItem(SimpleFlashMessagesComponent, {
        message: `Enlace copiado al portapapeles. ¡Ahora compártelo!`
      })
    );
  }
}
