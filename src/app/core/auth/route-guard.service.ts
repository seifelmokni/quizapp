import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserApiResponse } from '@app/shared/api';

@Injectable()
export class RouteGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/profile']);
      return;
    }

    if (!this.authService.isUserLoggedIn()) {
      return this.authService.auth().map((res: UserApiResponse) => {
        if (res.success === true) {
          this.router.navigate(['/profile']);
        } else {
          return true;
        }
      });
    }
  }

}
