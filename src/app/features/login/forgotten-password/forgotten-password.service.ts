import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ForgottenPasswordService {
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

  public loadForPassValidation(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        Validators.maxLength(35)
      ])
    });
  }

  public forgottenPassword(user: { email: string }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const userData = JSON.stringify(user);

    return this.http
      .post<any>(
        'https://d6dpv4x5yh.execute-api.eu-west-1.amazonaws.com/prod',
        userData,
        httpOptions
      )
      .map((res: any) => {
        return res;
      })
      .pipe(catchError(this.handleError));
  }
}
