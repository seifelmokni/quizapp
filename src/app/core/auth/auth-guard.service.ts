import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseResponse } from '@app/shared/api';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;

    this.authService.setRedirectUrl(url);
    if (this.authService.isUserLoggedIn()) {
      // The user is logged and coming from an angular navigation
      // On this case don't need a redirection
      return true;
    } else {
      // The user isn't logged or its the first time loading or a page refresh
      this.authService.auth().subscribe(
        (res: BaseResponse) => {
          if (res.success) {
            // It needs to be redirected because we are coming from a refresh
            this.router.navigate([this.authService.getRedirectUrl()]);
            return true;
          } else {
            // Login redirection if the user wasn't authenticated
            this.router.navigate(['/login']);
            return false;
          }
        },
        (err) => {
          this.authService.setUserLoggedIn(false);
          this.router.navigate(['/login']);
        }
      );
    }
    this.authService.setUserLoggedIn(false);
    this.router.navigate(['/login']);
    return false;
  }

  canLoad(route: Route): Observable<boolean> | boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else {
      return this.authService.auth().map((res: BaseResponse) => {
        if (res.success === true)  {
          return res.success;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

}
