import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { catchError } from 'rxjs/operators';
import { LoginUserRequest } from '@app/features/user/model/login-user-request';
import { Observable } from 'rxjs';
import { UserApiResponse, JwtTokenResponse, BaseResponse } from '@app/shared/api';
import { User } from '@app/domain';
import { LocalStorageService } from '@app/core/storage/local-storage.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
      private http: HttpClient,
      private localStorageService: LocalStorageService
    ) { }

    redirectUrl = '/profile';
    isLoggedIn = false;
    private loginUrl = `${env.apiUrl}/api/user/login`;
    private loggedInUser: User;


    public login(user: LoginUserRequest): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      };

      const userData = JSON.stringify(user);

      return this.http.post<UserApiResponse>(this.loginUrl, userData, httpOptions)
        .map((res: UserApiResponse) => {
          if (res.success) {
            const resUser: User = {
              id: res.data.user.id,
              username: res.data.user.username,
              firstName: res.data.user.firstName,
              lastName: res.data.user.lastName,
              email: res.data.user.email,
              image: res.data.user.image,
              badges: res.data.user.badges,
              extraLives: res.data.user.extraLives,
              score: res.data.user.score || 0,
              balance: res.data.user.balance || 0
            };
            this.loggedInUser = resUser;
            this.isLoggedIn = true;
          } else {
            this.isLoggedIn = false;
          }
          return res;
        })
        .pipe(catchError(this.handleError));
    }


    logout(): Observable<BaseResponse> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      };
      return this.http
      .post<BaseResponse>(
        `${env.apiUrl}/api/user/logout`
        , httpOptions
      )
      .map((res: BaseResponse) => {
          return res;
      });
    }

    auth(): Observable<BaseResponse> {
      const httpOptions = {
        withCredentials: true,
      };
      return this.http
        .get<BaseResponse>(
          `${env.apiUrl}/api/user/auth`,
          httpOptions
          )
        .map((res: BaseResponse) => {
          if (res.success) {
            this.isLoggedIn = true;
          } else {
            this.isLoggedIn = false;
          }
          return res;
        });
    }

    jwt(): Observable<JwtTokenResponse> {
      const httpOptions = {
        withCredentials: true,
      };
      return this.http
        .get<JwtTokenResponse>(
          `${env.apiUrl}/api/user/jwt`,
          httpOptions
        )
        .map((res: JwtTokenResponse) => {
          return res;
      });
    }

    isUserLoggedIn(): boolean {
      return this.isLoggedIn;
    }

    setUserLoggedIn(bool: boolean): void {
      this.isLoggedIn = bool;
    }

    getRedirectUrl(): string {
      return this.redirectUrl;
    }

    setRedirectUrl(url: string): void {
      this.redirectUrl = url;
    }

    getLoggedInUser(): User {
      return this.loggedInUser;
    }

    private handleError(error: HttpErrorResponse) {
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

}
