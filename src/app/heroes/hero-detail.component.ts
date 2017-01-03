import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from '../_services/hero.service';
import { Hero } from './hero'
import 'rxjs/add/operator/switchMap';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.css']
})
export class HeroDetailComponent {
  @Input() hero: Hero;


  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

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
