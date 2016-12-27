import { Component, OnInit } from '@angular/core';
import { Hero } from './hero'
import { HEROES } from './hero'


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  selectedHero: Hero;
  heroes = HEROES;
  constructor() { }

  ngOnInit() {
  }

  selectHero(hero: Hero): void{
    this.selectedHero = hero;
    console.debug("Hero: ", hero)
  }

}
