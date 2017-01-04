import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Injectable, isDevMode} from '@angular/core';
import { User } from '../_models/user';

@Injectable()
export class AuthService {
      // Observable string sources
    private localStorageSource = new Subject<string>();

    // Observable string streams
    localStorageChanged$ = this.localStorageSource.asObservable();
    public access_token: string;
    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.access_token = currentUser && currentUser.token;
    }

    private loginUrl = isDevMode() ? 'http://localhost:3000/oauth/token' : 'https://rails-heroes.herokuapp.com/oauth/token';
    private currentUserUrl = isDevMode() ? 'http://localhost:3000/current' : 'https://rails-heroes.herokuapp.com/current';
    user: User;
    currentUser: string;
    permissionsError: boolean;
    headers = new Headers({'Content-Type': 'application/json'});
    error = '';
    loading = false;
    loggedIn:boolean;

    login(username: string, password: string): Observable<boolean> {
      this.loading = true
      let grant_type = 'password';
      let params = JSON.stringify({username, password, grant_type});

      return this.http.post(this.loginUrl, params, { headers: this.headers } )
        .map((response: Response) => {
          if(response.json()){
            var access_token = response.json().access_token;
            var refresh_token = response.json().refresh_token;
            var created_at = response.json().created_at;
            var expires_in = response.json().expires_in;

          }


            if (access_token) {
                this.access_token = access_token;
                localStorage.setItem('currentUser', JSON.stringify({
                  email: username,
                  access_token: access_token,
                  refresh_token: refresh_token,
                  created_at: created_at,
                  expires_in: expires_in
                }));
                this.localStorageSource.next()
                return access_token;
            } else {
                return false;
            }
        })
    }

    logout() {
      this.access_token = null;
      localStorage.removeItem('currentUser');
      this.localStorageSource.next()

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
    }
}
