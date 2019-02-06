import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StateService } from '@app/core/state/state.service';

@Injectable()
export class QuizGuardService implements CanActivate {
  constructor(
    private stateService: StateService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.stateService.getGameStarted().subscribe((res: boolean) => {
      if (!res) {
        // Game is not started navigate to the profile
        this.router.navigate(['/profile']);
        return false;
      }
    });
    return true;
  }
}
