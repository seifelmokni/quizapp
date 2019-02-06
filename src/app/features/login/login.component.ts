import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { LoginUserRequest } from '@app/features/user/model/login-user-request';
import { Titled } from '@app/shared/head/titled';
import { Message } from '@app/shared/head/message';
import { Social } from '@app/shared/socials/social';
import { AuthService } from '@app/core';
import { FlashMessagesService } from '@app/shared/flash-messages/flash-messages.service';
import { FlashMessageItem } from '@app/shared/flash-messages/model/flash-message-item';
import { SimpleFlashMessagesComponent } from '@app/shared/flash-messages/simple-flash-messages/simple-flash-messages.component';
import { RegisterService } from '@app/features/register/register.service';
import { LoginService } from '@app/features/login/login.service';
import { UserApiResponse } from '@app/shared/api';
import { LoggerService } from '@app/core/logger/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: LoginUserRequest;
  loginForm: FormGroup;
  backgroundImage: string;
  titles: Titled[];
  subtitles: Titled[];
  message: Message;
  queryErrors$: Observable<string>;
  subscriptions: Subscription;
  socials: Social[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private registerService: RegisterService,
    private flashMessagesService: FlashMessagesService,
    private loggerService: LoggerService
  ) {}

  ngOnInit() {
    this.titles = this.loginService.getTitles();
    this.backgroundImage = this.loginService.getBackground();
    this.socials = this.registerService.getSocialMedia();
    this.afterReg();
    this.initUser();
    this.initForm();
    this.checkForResetPassowrdError();
    window.FirebasePlugin.setScreenName("Login");
  }

  ngOnDestroy() {
    this.subtitles = null;
    this.subscriptions.unsubscribe();
  }

  checkForResetPassowrdError(): void {
    this.queryErrors$ = this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) =>
        this.loginService.getError(params.get('error_message'))
      )
    );

    this.setErrorMessageFromQueryString();
  }

  setErrorMessageFromQueryString(): void {
    this.subscriptions = this.queryErrors$.subscribe((message: string) => {
      if (!message) {
        return;
      }

      this.flashMessagesService.setMessage(
        new FlashMessageItem(SimpleFlashMessagesComponent, { message })
      );
    });
  }

  afterReg(): void {
    const afterRegMessage = this.registerService.getAfterRegistrationMessage();
    if (afterRegMessage) {
      const messages = afterRegMessage.split('-/');
      this.subtitles = [
        new Titled('', 'h3 white', 'text'),
        new Titled('', 'h5 white', 'text')
      ];
      messages.forEach((message: string, index: number) => {
        if (message.length < 1) {
          return;
        }

        if (this.subtitles[index - 1]) {
          this.subtitles[index - 1].text = message;
          return;
        }

        this.subtitles.push(new Titled(message, 'h5 white', 'text'));
      });
      this.registerService.setAfterRegistrationMessage(null);
    }
  }

  initUser(): void {
    this.user = {
      email: '',
      password: ''
    };
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.user).subscribe((res: UserApiResponse) => {
      if (res.success === false) {
        this.flashMessagesService.setMessage(new FlashMessageItem(SimpleFlashMessagesComponent, { message: res.message }));
      }

      if (this.authService.isUserLoggedIn()) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.getRedirectUrl() ? this.authService.getRedirectUrl() : '/profile';
        this.loggerService.log('info', 'User is logged in sucessfully.');
        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }

  initForm(): void {
    this.loginForm = this.loginService.loadLoginValidation(this.user);
  }
}
