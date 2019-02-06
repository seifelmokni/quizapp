import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Titled } from '@app/shared/head/titled';
import { FlashMessagesService } from '@app/shared/flash-messages/flash-messages.service';
import { FlashMessageItem } from '@app/shared/flash-messages/model/flash-message-item';
import { SimpleFlashMessagesComponent } from '@app/shared/flash-messages/simple-flash-messages/simple-flash-messages.component';
import { ResetPasswordService } from '@app/features/login/reset-password/reset-password.service';
import { LoginService } from '@app/features/login/login.service';
import { BaseResponse } from '@app/shared/api';



interface ResetPasswordUser {
  password: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  titles: Titled[];
  resetPasswordForm: FormGroup;
  user: ResetPasswordUser;
  backgroundImage: string;
  token$: Observable<string>;
  subscription: Subscription;

  constructor(
    private loginServie: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private resetPasswordService: ResetPasswordService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.backgroundImage = this.loginServie.getBackground();
    this.setTitles();
    this.initForm();
    this.initUser();
  }

  initForm(): void {
    this.resetPasswordForm = this.resetPasswordService.loadResetPassValidation();
  }

  initUser(): void {
    this.user = {
      password: ''
    };
  }

  setTitles(): void {
    this.titles = [new Titled('Recuperar contraseña', 'h4 white', 'text')];
  }

  resetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.token$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.resetPasswordService.getToken(params.get('uniqueToken'))
      )
    );

    this.reset();
  }

  reset(): void {
    this.subscription = this.token$.subscribe(token => {
      this.resetPasswordService
        .resetPassword(token, this.user.password)
        .subscribe((data: BaseResponse) => {
          this.resetPasswordForm.reset();

          if (data.success === false) {
            this.flashMessagesService.setMessage(
              new FlashMessageItem(SimpleFlashMessagesComponent, {
                message: data.message
              })
            );
            this.router.navigate(['/login']);
            return;
          }

          this.flashMessagesService.setMessage(
            new FlashMessageItem(SimpleFlashMessagesComponent, {
              message: data.message
            })
          );
          this.router.navigate(['/login']);
        });
    });
  }
}
