import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { IsWinnerResponse } from '@app/shared/api';
import { LoaderService } from '@app/shared/loader/loader.service';
import { UserService } from '@app/features/user/services/user.service';
import { QuizService } from '@app/features/show-time/services/quiz.service';
import { Quiz } from '@app/domain';

@Injectable()
export class FinalScreenResolverService implements Resolve<IsWinnerResponse> {


  private quiz: Quiz;

  constructor(
    private userService: UserService,
    private router: Router,
    private quizService: QuizService,
    private loaderService: LoaderService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IsWinnerResponse> {
    this.loaderService.show();
    this.quizService.quiz$.subscribe(data => this.quiz = data );
    return this.userService.isWinner(this.quiz.id).pipe(
       map(isWinner => {
         this.loaderService.hide();
         if (isWinner) {
          return isWinner;
        }
        this.router.navigate(['/profile']);
        return null;
      })
    );
  }
}
