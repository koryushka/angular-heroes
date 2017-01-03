
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { HeroService } from './_services/hero.service';
import { HeroSearchService } from './heroes/hero-search.service';
import { HeroSearchComponent } from './heroes/hero-search.component';

import { HeroComponent } from './heroes/hero.component';
import { HeroDetailComponent } from './heroes/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HighlightDirective } from './highlight.directive';

import './rxjs-extensions';
import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './_guards/logged-in.guard';
import { UserService } from './_services/user.service';
import { HttpClient } from './login/http-client';

import { AuthService } from './_services/auth.service';



@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    DashboardComponent,
    HighlightDirective,
    LoginComponent

  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    HeroService,
    HeroSearchService,
    UserService,
    AuthService,
    LoggedInGuard,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
