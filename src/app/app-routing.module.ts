import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './heroes/hero.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './heroes/hero-detail.component';
import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './_guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {path: 'heroes', component: HeroComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[LoggedInGuard]},
  {path: 'heroes/:id', component: HeroDetailComponent},
  { path: 'login', component: LoginComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
// , canActivate:[LoggedInGuard]
