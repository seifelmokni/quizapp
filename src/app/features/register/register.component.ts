import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Social } from '@app/shared/socials/social';
import { Titled } from '@app/shared/head/titled';
import { Message } from '@app/shared/head/message';
import { FlashMessagesService } from '@app/shared/flash-messages/flash-messages.service';
import { LoaderService } from '@app/shared/loader/loader.service';
import { SimpleFlashMessagesComponent } from '@app/shared/flash-messages/simple-flash-messages/simple-flash-messages.component';
import { FlashMessageItem } from '@app/shared/flash-messages/model/flash-message-item';
import { RegisterUserInfo } from '@app/features/register/register-user-info';
import { RegisterService } from '@app/features/register/register.service';
import { BaseResponse } from '@app/shared/api';
import { LocalStorageService } from '@app/core/storage/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {
  user: RegisterUserInfo;
  registerForm: FormGroup;
  backgroundImage: string;
  socials: Social[];
  titles: Titled[];
  messages: Message[];
  subscriptions: Subscription;

  constructor(
    private registerService: RegisterService,
    private localStorageService: LocalStorageService,
    private flashMessagesService: FlashMessagesService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.backgroundImage = this.registerService.getBackground();
    this.socials = this.registerService.getSocialMedia();
    this.titles = this.registerService.getRegisterTitles();

    // Twitter cards
    this.loadTwitterCards();

    // Opengraph
    this.loadOpenGraph();
    this.setReferralCodeToSocials();
    this.initUser();
    this.initForm();
    this.setReferralCodeToLocalStorage();

    // Scroll at the top of the windows to show the checkboxes
    window.scroll(0, 0);
    window.FirebasePlugin.setScreenName("Register");
  }

  ngAfterViewInit() {
    this.validateSocials();
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }

    this.initUser();
  }

  loadTwitterCards(): void {
    this.meta.updateTag({
      name: 'title',
      content: 'Regístrate y gana | quizvideo'
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Regístrate y gana | quizvideo'
    });
    this.meta.updateTag({
      name: 'twitter:url',
      content: 'https://quizvideo.com/register'
    });
  }

  loadOpenGraph(): void {
    this.meta.updateTag({
      name: 'og:title',
      content: 'Regístrate y gana | quizvideo'
    });
    this.meta.updateTag({
      name: 'og:url',
      content: 'https://quizvideo.com/register'
    });
  }

  initUser(): void {
    this.user = {
      username: '',
      email: '',
      password: '',
      referral_user_id: null,
      provide_email: false,
      terms_and_conditions: false
    };
  }

  initForm(): void {
    this.registerForm = this.registerService.loadRegisterValidation(this.user);
  }

  onFormData(): void {
    if (this.registerForm.invalid === true) {
      this.validateAllFormFields(this.registerForm);
      return;
    }
    this.register();
  }

  validateSocials(): void {
    const socials = document.querySelectorAll('.social .btn');
    for (let i = 0; i < socials.length; i++) {
      const htmlElement = socials[i];
      htmlElement.addEventListener('click', (event: Event) => {
        if (!this.user.provide_email || !this.user.terms_and_conditions) {
          event.preventDefault();
          return;
        }
      });
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  register() {
    this.loaderService.show();
    const referral_user_id = this.route.snapshot.paramMap.get(
      'referral_user_id'
    );

    if (referral_user_id) {
      this.user.referral_user_id = referral_user_id;
    }

    this.registerService.register(this.user).subscribe((res: BaseResponse) => {
      if (res.success) {
        this.deleteReferralCodeFromLocalStorage();
        this.registerService.loginAfterRegister(this.user);
        this.loaderService.hide();
        return;
      }

      this.loaderService.hide();
      this.flashMessagesService.setMessage(
        new FlashMessageItem(SimpleFlashMessagesComponent, {
          message: res.message
        })
      );
    });
  }

  setReferralCodeToLocalStorage(): void {
    this.localStorageService.setItem('referral_user_id', this.route.snapshot.paramMap.get('referral_user_id'));
  }

  deleteReferralCodeFromLocalStorage(): void {
    this.localStorageService.removeItem('referral_user_id');
  }

  setReferralCodeToSocials(): void {
    const referral_user_id = this.route.snapshot.paramMap.get('referral_user_id');
    if (!referral_user_id) {
      return;
    }

    for (let i = 0; i < this.socials.length; i++) {
      const social = this.socials[i];
      social.setUrl(`${social.getUrl()}?referral_user_id=${referral_user_id}`);
    }
  }
}
