import { Injectable, isDevMode }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';
import { Hero }           from './hero';
@Injectable()
export class HeroSearchService {
  private heroesUrl = isDevMode() ? 'http://localhost:3000/heroes' : 'https://rails-heroes.herokuapp.com/heroes'

  constructor(private http: Http) {}
  search(term: string): Observable<Hero[]> {
    const searchUrl = `${this.heroesUrl}?name=${term}`
    return this.http
               .get(searchUrl)
               .map((r: Response) => r.json() as Hero[]);
  }
}
