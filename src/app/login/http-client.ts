import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { UserService } from '../_services/user.service'

@Injectable()
export class HttpClient {

  constructor(private http: Http) {}
  headers = new Headers({'Content-Type': 'application/json'});

  createAuthorizationHeader() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      let authToken = currentUser.access_token
      this.headers.set('Authorization', `Bearer ${authToken}`)
    }
  }

  get(url) {
    this.createAuthorizationHeader();
    return this.http.get(url, {
      headers: this.headers
    });
  }

  post(url, data) {
    this.createAuthorizationHeader();
    return this.http.post(url, data, {
      headers: this.headers
    });
  }

  put(url, data) {
    this.createAuthorizationHeader();
    return this.http.put(url, data, {
      headers: this.headers
    });
  }

  delete(url) {
    this.createAuthorizationHeader();
    return this.http.delete(url, {
      headers: this.headers
    });
  }
}
