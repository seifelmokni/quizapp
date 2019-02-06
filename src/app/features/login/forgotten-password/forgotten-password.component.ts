import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';
import { ForgottenPasswordService } from '@app/features/login/forgotten-password/forgotten-password.service';
import { Titled } from '@app/shared/head/titled';
import { FlashMessagesService } from '@app/shared/flash-messages/flash-messages.service';
import { SimpleFlashMessagesComponent } from '@app/shared/flash-messages/simple-flash-messages/simple-flash-messages.component';
import { FlashMessageItem } from '@app/shared/flash-messages/model/flash-message-item';

interface ForPassUser {
  email: string;
}

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html'
})
export class ForgottenPasswordComponent implements OnInit {
  titles: Titled[];
  subtitles: Titled[];
  user: ForPassUser;
  backgroundImage: string;
  forgottenPasswordSub: Subscription;
  forgPassForm: FormGroup;

  constructor(
    private loginServie: LoginService,
    private forgottenPasswordService: ForgottenPasswordService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.titles = [new Titled('Resetear contraseña', 'h4 white', 'text')];
    this.subtitles = [new Titled('Introduce tu email', 'h5 white', 'text')];
    this.backgroundImage = this.loginServie.getBackground();
    this.initUser();
    this.initForm();
    window.FirebasePlugin.setScreenName("Forgot password");
  }

  initUser(): void {
    this.user = {
      email: ''
    };
  }

  initForm(): void {
    this.forgPassForm = this.forgottenPasswordService.loadForPassValidation();
  }

  forgottenPassword(): void {
    if (this.forgPassForm.invalid) {
      return;
    }

    this.forgottenPasswordSub = this.forgottenPasswordService
      .forgottenPassword(this.user)
      .subscribe((data: any) => {
        this.flashMessagesService.setMessage(
          new FlashMessageItem(SimpleFlashMessagesComponent, {
            message:
              'Por favor revisa' +
              ' tu correo. Haz click en el enlace que te hemos enviado para resetear tu contraseña. Recuerda mirar en la carpeta de SPAM.'
          })
        );
      });
  }

  clearforgottenPasswordSub(): void {
    if (!this.forgottenPasswordSub) {
      return;
    }

    this.forgottenPasswordSub.unsubscribe();
  }
}
