import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Titled } from '@app/shared/head/titled';
import { LoginUserRequest } from '@app/features/user/model/login-user-request';

@Injectable()
export class LoginService {
  private loginTitles: Titled[];
  private background: string;

  constructor(private http: HttpClient) {
    this.loginTitles = [
      new Titled('Login', 'h3 white', 'text'),
      new Titled('QV', 'logo logo-small logo-white', 'logo')
    ];
    this.setBackground('assets/images/backgrounds/background-red.jpg');
  }

  public getBackground(): string {
    return this.background;
  }

  public setBackground(image: string): void {
    this.background = image;
  }

  public loadLoginValidation(user: LoginUserRequest): FormGroup {
    return new FormGroup({
      email: new FormControl(user.email, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        Validators.maxLength(35)
      ]),
      password: new FormControl(user.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35)
      ])
    });
  }

  public getTitles(): Titled[] {
    return this.loginTitles;
  }

  public getError(error: string): Observable<string> {
    const observable = new Observable<string>(observer => {
      observer.next(error);
    });

    return observable;
  }
}
