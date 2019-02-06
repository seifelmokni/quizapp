import { Injectable } from '@angular/core';
import { User } from '@app/domain/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { UserApiResponse, IsWinnerResponse, GameResultsResponse, BaseResponse } from '@app/shared/api';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Observable
  private userSubject = new BehaviorSubject<User>(new User());
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) {}


  public reqResultInfo(): Observable<any> {
    const httpOptions = {
      withCredentials: true,
    };
    return this.http
      .get<UserApiResponse>(
        `${env.apiUrl}/api/user/result`,
        httpOptions
      )
      .map((res: UserApiResponse) => {
        if (res.success) {
          this.setUser(res.data.user);
        }
        return res;
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves the user user Profile Info from game_express_server
   */
  public reqProfileInfo(): Observable<any> {
    const httpOptions = {
      withCredentials: true,
    };
    return this.http
      .get<UserApiResponse>(
        `${env.apiUrl}/api/user/profile`,
        httpOptions
      )
      .map((res: UserApiResponse) => {
        if (res.success) {
          this.setUser(res.data.user);
        }
        return res;
      })
      .pipe(catchError(this.handleError));
  }

  public isWinner(quizId): Observable<any> {
    const httpOptions = {
      withCredentials: true,
    };
    return this.http
      .get<IsWinnerResponse>(
        `${env.apiUrl}/api/user/iswinner/${quizId}`,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public getWinners(id: number): Observable<any> {
    const httpOptions = {
      withCredentials: true,
    };
    return this.http
      .get<GameResultsResponse>(
        `${env.apiUrl}/api/user/winners/${id}`,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public getUserExtraLives(): number {
    let extraLives = 0;
    this.user$.subscribe(data => extraLives = data.extraLives);
    return extraLives;
  }

  public getBalance(): number {
    let balance = 0;
    this.user$.subscribe(data => balance = data.balance);
    return balance;
  }

  public getProfileImage(): string {
    let image = ''; // FIXME : Add here
    this.user$.subscribe(data => image = data.image);
    return image;
  }

  public updateUserReferral(referral_user_id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };

    const data = {
      referral_user_id
    };

    return this.http
      .put<BaseResponse>(
        `${env.apiUrl}/api/user/update/referral`,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle error in user API requests
   *
   * @private
   * @param {HttpErrorResponse} error
   * @returns
   * @memberof UserService
   */
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

  /**
   * Updates the User info
   *
   * @param {User} user
   * @memberof UserService
   */
  public setUser(user: User): void {
    user.image = user.image !== null ? user.image.replace(/http:/g, '') : null;
    this.userSubject.next(user); // Observable
  }

  /**
   * Listen the user changes
   *
   * @returns {Observable<User>}
   * @memberof UserService
   */
  public getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }
}
