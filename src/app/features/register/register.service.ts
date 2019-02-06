import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Titled } from '@app/shared/head/titled';
import { Message } from '@app/shared/head/message';
import { environment as env } from '@env/environment';
import { Social } from '@app/shared/socials/social';
import { RegisterUserInfo } from '@app/features/register/register-user-info';
import { UserApiResponse } from '@app/shared/api';
import { AuthService } from '@app/core';

@Injectable()
export class RegisterService {
  private registerUrl: string;
  private backgroundImage: string;
  private registerTitles: Titled[];
  private messageAfterRegistration: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
    ) {
    this.registerUrl = `${env.apiUrl}/api/user/register`;
    this.registerTitles = [
      new Titled('¡Regístrate!', 'h4 white', 'text'),
      new Titled('QV', 'logo logo-small logo-white', 'logo')
    ];
    this.setBackground('assets/images/backgrounds/background-green-image.jpg');
  }

  private handleError(error: HttpErrorResponse): ErrorObservable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable();
  }

  public register(user: RegisterUserInfo): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;',
      }),
      withCredentials: true,
    };

    const userData = JSON.stringify(user);

    return this.http
      .post<any>(this.registerUrl, userData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public loginAfterRegister(user: RegisterUserInfo) {
    this.authService.login(user).subscribe((res: UserApiResponse) => {
      if (this.authService.isUserLoggedIn()) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.getRedirectUrl() ? this.authService.getRedirectUrl() : '/profile';

        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }

  public getBackground(): string {
    return this.backgroundImage;
  }

  public setBackground(image: string): void {
    this.backgroundImage = image;
  }

  public getSocialMedia(): Social[] {
    return [
      new Social('Facebook', env.apiUrl + '/auth/facebook', 'assets/images/social/fb_2.png'),
      new Social('Twitter', env.apiUrl + '/auth/twitter', 'assets/images/social/tw_2.png')
      // new Social('Instagram', env.apiUrl + '/auth/instagram', 'assets/images/social/in_2.png')
    ];
  }

  public getRegisterTitles(): Titled[] {
    return this.registerTitles;
  }

  public navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  // FIXME
  public navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  public setAfterRegistrationMessage(message: string): void {
    if (message === null) {
      this.messageAfterRegistration = null;
      return;
    }

    if (message.length < 1) {
      return;
    }
    this.messageAfterRegistration = message;
  }

  public getAfterRegistrationMessage(): string {
    return this.messageAfterRegistration;
  }

  public loadRegisterValidation(user: RegisterUserInfo): FormGroup {
    return new FormGroup({
      username: new FormControl(user.username, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35)
      ]),
      email: new FormControl(user.email, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        Validators.maxLength(35)
      ]),
      password: new FormControl(user.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35)
      ]),
      terms_and_conditions: new FormControl(user.terms_and_conditions, [
        Validators.requiredTrue
      ]),
      provide_email: new FormControl(user.provide_email, [
        Validators.requiredTrue
      ])
    });
  }
}
