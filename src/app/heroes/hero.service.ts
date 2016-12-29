import { Injectable,isDevMode } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { UserService } from '../login/user.service'
import { HttpClient } from '../login/http-client'
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()

export class HeroService {
  private authToken: string;
  private headers: Headers;
  permissionsError: boolean;
  private heroesUrl = isDevMode() ? 'http://localhost:3000/heroes' : 'https://rails-heroes.herokuapp.com/heroes'

  constructor(private http: HttpClient, private userService: UserService) {}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json() as Hero[])
               .catch(this.handleError)
  }

  getHero(id: number): Promise<Hero> {
    let heroUrl = `${this.heroesUrl}/${id}`;
    return this.http.get(heroUrl)
               .toPromise()
               .then(resp => resp.json() as Hero)
               .catch(this.handleError)
  }

  updateHero(hero: Hero): Promise<Hero>{
    let heroUrl = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(heroUrl, JSON.stringify(hero))
                    .toPromise()
                    .then(()=>hero)
                    .catch(this.handleError)
  }

  createHero(name: string): Promise<Hero>{
    this.headers = this.userService.headers;
    return this.http.post(this.heroesUrl, JSON.stringify({name: name}))
                    .toPromise()
                    .then(hero => hero.json())
                    .catch(this.handleError)
  }

  deleteHero(id: number): Promise<void>{
    this.headers = this.userService.headers;
    let heroUrl = `${this.heroesUrl}/${id}`;
    return this.http.delete(heroUrl)
                    .toPromise()
                    .then(() => null)
                    .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    this.permissionsError = true

    return Promise.reject(error.message || error);
  }
}
