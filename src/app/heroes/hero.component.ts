import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router'
import { Hero } from './hero';
import { HeroService } from './hero.service'


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  providers: [HeroService]
})

export class HeroComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(private router: Router, private heroService: HeroService) { }

  ngOnInit(){
    this.getHeroes();
  }

  getHeroes(){
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  selectHero(hero: Hero): void{
    this.selectedHero = hero;
    console.debug("Hero: ", hero)
  }

  goToDetail(){
    let link = [`heroes/${this.selectedHero.id}`]
    this.router.navigate(link)
  }

  addHero(name: string){
    name = name.trim();
    if(!name){return};
    this.heroService.createHero(name)
        .then(
          hero =>{
            this.heroes.unshift(hero);
            this.selectedHero = null;
          }
        )
  }

  deleteHero(hero: Hero){
    this.heroService.deleteHero(hero.id)
                    .then(
                      () => {
                        this.heroes = this.heroes.filter(h => h !== hero);
                        if (this.selectedHero === hero) { this.selectedHero = null; }
                      }
                    )
  }

}
