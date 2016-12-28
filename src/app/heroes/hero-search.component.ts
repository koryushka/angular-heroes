import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
import { Subject }           from 'rxjs/Subject';
import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes:Observable<Hero[]>;
  private searchTerms= new Subject<string>();

  constructor(private heroSearchService: HeroSearchService, private router: Router){}

  search(term: string): void {
    console.debug("TERM: ", term)
    this.searchTerms.next(term);
  }

  ngOnInit(): void{
    console.debug("Search service init")
    this.heroes = this.searchTerms
                      .debounceTime(300)
                      .distinctUntilChanged()
                      .switchMap(term => term
                        ? this.heroSearchService.search(term)
                        : Observable.of<Hero[]>([])
                      )
                      .catch(error => {
                        // TODO: real error handling
                        console.log(error);
                        return Observable.of<Hero[]>([]);
                      });



  };

  gotoDetail(hero: Hero){
      const url = `heroes/${hero.id}`
      this.router.navigate([url])
  }
}
