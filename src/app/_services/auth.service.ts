import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { Injectable, isDevMode} from '@angular/core';
import { User } from '../_models/user';

@Injectable()
export class AuthService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    private loginUrl = isDevMode() ? 'http://localhost:3000/oauth/token' : 'https://rails-heroes.herokuapp.com/oauth/token';
    private currentUserUrl = isDevMode() ? 'http://localhost:3000/current' : 'https://rails-heroes.herokuapp.com/current';
    user: User;
    currentUser: string;
    permissionsError: boolean;
    headers = new Headers({'Content-Type': 'application/json'});
    error = '';
    loading = false;
    // login2(username, password) {
    //   let grant_type = 'password'
    //   let params = JSON.stringify({username, password, grant_type})
    //   return this.http.post(this.loginUrl, params, { headers: this.headers } )
    //     .map(res => res.json())
    //     .map((res) => {
    //       console.debug("RESP: ", res)
    //
    //       // if (res) {
    //       //   var accessToken = res.access_token
    //       //   this.getCurrentUser(accessToken).then(user => {
    //       //     localStorage.setItem('currentUser', JSON.stringify({email: user.email, is_admin: user.is_admin, access_token: res.access_token}));
    //       //     this.currentUser = localStorage.getItem('currentUser')
    //       //     this.user = JSON.parse(this.currentUser)
    //       //     // this.user = currentUser
    //       //     console.debug("LOGIN USR: ", this.user)
    //       //     // return this.currentUser;
    //       //   })
    //       // }
    //     });
    //
    // }

    login(username: string, password: string): Observable<boolean> {
      this.loading = true
      let grant_type = 'password';
      let params = JSON.stringify({username, password, grant_type});

      return this.http.post(this.loginUrl, params, { headers: this.headers } )

        .map((response: Response) => {

            // login successful if there's a jwt token in the response
            let token = response.json() && response.json().access_token;
            // let token = null;
            console.debug('SERVICE RESULT: ', token)

            if (token) {
                // set token property
                this.token = token;

                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ email: username, token: token }));

                // return true to indicate successful login
                return token;
            } else {
                // return false to indicate failed login

                return false;
            }

        })


}

    logout() {
      this.token = null;
      localStorage.removeItem('currentUser');
    }

    getCurrentUser(accessToken: string): Promise<User>{
        this.headers.set('Authorization', `Bearer ${accessToken}`)
        return this.http.get(this.currentUserUrl, { headers: this.headers } )
                        .toPromise()
                        .then((resp) => resp.json() as User)
                        .catch(this.handleError)
    }

    raisePermError(){
      this.permissionsError = true
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only

      console.error('permissionsError', this.permissionsError)
      this.error = 'Login error'

      return Promise.reject(error.message || error);
      // return false;
    }
}
