import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { QuizComponent } from '@app/features/show-time/quiz/quiz.component';
import { FinalScreenComponent } from '@app/features/show-time/final-screen/final-screen.component';

import { FinalScreenResolverService } from './final-screen/final-screen-resolver.service';
// import { QuizGuardService } from '@app/core/auth/quiz-guard.service';
import { AuthGuardService } from '@app/core';
import { QuizGuardService } from '@app/core/auth/quiz-guard.service';

const showTimeRoutes: Routes = [
  {
    path: 'show-time',
    component: QuizComponent,
    canActivate: [AuthGuardService, QuizGuardService]
  },
  {
    path: 'final',
    component: FinalScreenComponent,
    canActivate: [AuthGuardService, QuizGuardService],
    resolve: {
      isWinner: FinalScreenResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(showTimeRoutes)],
  exports: [RouterModule],
  providers: [FinalScreenResolverService]
})
export class ShowTimeRoutingModule {}
