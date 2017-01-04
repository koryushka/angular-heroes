import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from '../_services/hero.service';
import { AuthService } from '../_services/auth.service';
import { Hero } from './hero'
import { User } from '../_models/user'

import 'rxjs/add/operator/switchMap';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.css'],
  providers: [AuthService]
})
export class HeroDetailComponent {
  @Input() hero: Hero;

  //
  // constructor(
  //   private heroService: HeroService,
  //   private route: ActivatedRoute,
  //   private location: Location
  // ) { }

  currentUser:User;
  constructor(private heroService: HeroService,private route: ActivatedRoute, private authService: AuthService, private router: Router, private location: Location){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    authService.localStorageChanged$.subscribe(
      currentUser => {
        console.debug("CU: ", localStorage.getItem('currentUser'))
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
      }
    );
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back();
  }

  saveHero(): void{
    this.heroService.updateHero(this.hero)
                    .then(() => this.goBack())
  }

  deleteHero(hero: Hero): void{
    this.heroService.deleteHero(hero.id).then(() => this.goBack())

  }

}
