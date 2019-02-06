import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { ProfileComponent } from '@app/features/user/profile/profile.component';
import { UserRoutingModule } from '@app/features/user/user-routing.module';
import { ExtraLifesComponent } from '@app/features/user/extra-lifes/extra-lifes.component';
import { BalanceComponent } from '@app/features/user/balance/balance.component';
import { GameResultsComponent } from '@app/features/user/game-results/game-results.component';
import { BalanceService } from '@app/features/user/balance/balance.service';
import { SlickModule } from 'ngx-slick';
import { UserService } from '@app/features/user/services/user.service';
import { LocalStorageService } from '@app/core/storage/local-storage.service';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule,
    SlickModule,
  ],
  declarations: [
    ProfileComponent,
    ExtraLifesComponent,
    BalanceComponent,
    GameResultsComponent
  ],
  providers: [BalanceService, UserService, LocalStorageService]
})
export class UserModule {}
