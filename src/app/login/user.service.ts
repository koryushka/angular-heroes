// user.service.ts
import { Injectable, isDevMode } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class UserService {
  private loggedIn = false;
  private loginUrl = isDevMode() ? 'http://localhost:3000/oauth/token' : 'https://rails-heroes.herokuapp.com/oauth/token'

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = `${this.loginUrl}?username=${username}&password=${password}&grant_type=password`
    return this.http
      .post(
        params,{},{ headers }
      )
      .map(res => res.json())
      .map((res) => {
        console.debug("RES: ", res)

        if (res) {
          localStorage.setItem('auth_token', res.access_token);
          this.loggedIn = true;
        }

        return res;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
