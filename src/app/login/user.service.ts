// user.service.ts
import { Injectable, isDevMode } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from './user'

@Injectable()
export class UserService {
  public loggedIn = false;
  private loginUrl = isDevMode() ? 'http://localhost:3000/oauth/token' : 'https://rails-heroes.herokuapp.com/oauth/token';
  private currentUserUrl = isDevMode() ? 'http://localhost:3000/current' : 'https://rails-heroes.herokuapp.com/current';
  user: User;
  email: string;
  authToken = localStorage.getItem('auth_token');
  headers = new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authToken}`})
  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');

  }

  login(username, password) {
    let headers = new Headers();
    let grant_type = 'password'
    headers.append('Content-Type', 'application/json');
    // let params = `${this.loginUrl}?username=${username}&password=${password}&grant_type=password`
    let params = JSON.stringify({username, password, grant_type})
    return this.http.post(this.loginUrl, params, { headers: headers } )
      .map(res => res.json())
      .map((res) => {
        console.debug("RES: ", res)

        if (res) {
          localStorage.setItem('auth_token', res.access_token);
          this.loggedIn = true;
          this.getCurrentUser().then(user => {
            localStorage.setItem('currentUser', user.email);
          })
        }

        return res;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('currentUser');

    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getCurrentUser(): Promise<User>{
    if(this.loggedIn){
      let authToken = localStorage.getItem('auth_token');

      let headers = new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`})
      let r = this.http.get(this.currentUserUrl, { headers: headers } )
                      .toPromise()
                      .then(resp => resp.json() as User)
                      .catch(this.handleError)

      return r
        // .map(res => res.json())
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
