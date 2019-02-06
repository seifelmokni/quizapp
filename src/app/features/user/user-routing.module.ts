import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from '@app/core/auth/auth-guard.service';
import { ExtraLifesComponent } from './extra-lifes/extra-lifes.component';
import { BalanceComponent } from './balance/balance.component';
import { GameResultsComponent } from './game-results/game-results.component';

const userRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'invite',
    component: ExtraLifesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'balance',
    component: BalanceComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'game-results',
    component: GameResultsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
