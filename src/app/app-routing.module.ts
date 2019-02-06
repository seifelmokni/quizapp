import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '@app/static/not-found/not-found.component';
import { AuthGuardService } from '@app/core';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'profile', loadChildren: 'app/features/user/user.module#UserModule', canLoad: [AuthGuardService] },
  { path: 'show-time', loadChildren: 'app/features/show-time/show-time.module#ShowTimeModule', canLoad: [AuthGuardService] },
  { path: 'final', loadChildren: 'app/features/show-time/show-time.module#ShowTimeModule', canLoad: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
