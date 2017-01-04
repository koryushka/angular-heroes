import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './heroes/hero.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './heroes/hero-detail.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { LoggedInGuard } from './_guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {path: 'heroes', component: HeroComponent},
  {path: 'welcome', component: WelcomeComponent},

  {path: 'dashboard', component: DashboardComponent, canActivate:[LoggedInGuard]},
  {path: 'account', component: AccountComponent, canActivate:[LoggedInGuard]},

  {path: 'heroes/:id', component: HeroDetailComponent},
  { path: 'login', component: LoginComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
// , canActivate:[LoggedInGuard]
