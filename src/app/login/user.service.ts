// user.service.ts
import { Injectable, isDevMode} from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from './user'

@Injectable()
export class UserService {
  public loggedIn = false;
  private loginUrl = isDevMode() ? 'http://localhost:3000/oauth/token' : 'https://rails-heroes.herokuapp.com/oauth/token';
  private currentUserUrl = isDevMode() ? 'http://localhost:3000/current' : 'https://rails-heroes.herokuapp.com/current';
  user: User;
  permissionsError: boolean;
  authToken = localStorage.getItem('auth_token');
  email = localStorage.getItem('currentUser');
  headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');

  }

  login(username, password) {
    let grant_type = 'password'
    let params = JSON.stringify({username, password, grant_type})
    return this.http.post(this.loginUrl, params, { headers: this.headers } )
      .map(res => res.json())
      .map((res) => {
        console.debug('res: ', res)

        if (res) {

          localStorage.setItem('auth_token', res.access_token);
          this.loggedIn = true;
          this.getCurrentUser().then(user => {
            localStorage.setItem('currentUser',user.email);
            this.email = user.email;
          })
        }
        return res;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('currentUser');
    this.headers.delete('Authorization')
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getCurrentUser(): Promise<User>{
    if(this.loggedIn){
      this.setAuthHeaders()
      return this.http.get(this.currentUserUrl, { headers: this.headers } )
                      .toPromise()
                      .then(resp => resp.json() as User)
                      .catch(this.handleError)
    }
  }

  setAuthHeaders(){
    let authToken = localStorage.getItem('auth_token');
    this.headers.set('Authorization', `Bearer ${authToken}`)
  }

  raisePermError(){
    this.permissionsError = true
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only

    console.error('permissionsError', this.permissionsError)
    return Promise.reject(error.message || error);
  }
}
