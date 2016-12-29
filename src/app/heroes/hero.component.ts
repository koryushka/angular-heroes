import { Component, OnInit, Input } from '@angular/core';
import { Router }   from '@angular/router';
import { Headers } from '@angular/http';
import { Hero } from './hero';
import { HeroService } from './hero.service'
import { UserService } from '../login/user.service'



@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  providers: [HeroService]
})

export class HeroComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];
  permissionsError: boolean;
  loggedIn: boolean;
  @Input() userLoggedIn:boolean;

  constructor(private router: Router, private heroService: HeroService, private userService: UserService) {
    this.loggedIn = this.userService.isLoggedIn();
  }

  ngOnInit(){
    this.getHeroes()
  }

  getHeroes(){
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  selectHero(hero: Hero): void{
    this.selectedHero = hero;
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
