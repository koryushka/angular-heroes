import { Injectable,isDevMode } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { UserService } from '../login/user.service'


import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()

export class HeroService {
  private authToken: string;
  private headers: Headers;
  private heroesUrl = isDevMode() ? 'http://localhost:3000/heroes' : 'https://rails-heroes.herokuapp.com/heroes'


  // headers.append('Authorization', `Bearer ${authToken}`);
  // console.debug("HEADRES: ", headers)
  constructor(private http: Http, userService: UserService) {
    this.authToken = userService.authToken;
    this.headers = userService.headers;
    console.debug("HEADERS: ", this.headers)
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json() as Hero[])
               .catch(this.handleError)
  }

  getHero(id: number): Promise<Hero> {
    // console.debug("HEADRES: ", this.headers)

    let heroUrl = `${this.heroesUrl}/${id}`;
    return this.http.get(heroUrl)
               .toPromise()
               .then(resp => resp.json() as Hero)
               .catch(this.handleError)
  }

  updateHero(hero: Hero): Promise<Hero>{
    let heroUrl = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(heroUrl, JSON.stringify(hero), {headers: this.headers})
                    .toPromise()
                    .then(()=>hero)
                    .catch(this.handleError)
  }

  createHero(name: string): Promise<Hero>{
    return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
                    .toPromise()
                    .then(hero => hero.json())
                    .catch(this.handleError)
  }

  deleteHero(id: number): Promise<void>{
    let heroUrl = `${this.heroesUrl}/${id}`;
    return this.http.delete(heroUrl, {headers: this.headers})
                    .toPromise()
                    .then(() => null)
                    .catch(this.handleError)
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
