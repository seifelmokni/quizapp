import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import { PaymentRequestToken, BaseResponse } from '@app/shared/api';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BalanceService {
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

  public reqPaymentToken(): Observable<any> {
    const httpOptions = {
      withCredentials: true,
    };
    return this.http
      .get<PaymentRequestToken>(
        `${env.apiUrl}/api/user/token`,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public sendToken(token: string): Observable<BaseResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };

    const data = {
      paymentToken: token
    };

    return this.http.put<BaseResponse>(
      `${env.apiUrl}/api/user/token`,
      JSON.stringify(data),
      httpOptions
    );
  }
}
