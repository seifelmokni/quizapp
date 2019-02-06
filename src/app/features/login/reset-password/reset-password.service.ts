import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { environment as env } from '@env/environment';
import { catchError } from 'rxjs/operators';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

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

  public resetPassword(token: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };

    return this.http
      .post<any>(
        `${env.baseUrl}/forgotten-credentials/${token}`,
        { password: JSON.stringify(password) },
        httpOptions
      )
      .map((res: any) => {
        return res;
      })
      .pipe(catchError(this.handleError));
  }

  public loadResetPassValidation(): FormGroup {
    return new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35)
      ])
    });
  }

  public getToken(token: string): Observable<string> {
    if (!token) {
      return;
    }

    const observable = new Observable<string>(observer => {
      observer.next(token);
    });

    return observable;
  }
}
