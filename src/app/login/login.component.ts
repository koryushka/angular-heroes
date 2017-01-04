// login.component.ts
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location }                 from '@angular/common';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  title = 'app works!';
  error = '';
  loading:boolean;
  model: any = {};
  currentUser: string;
  user: User;
  permissionsError: boolean;
  private location: Location;

  @Output() localStorageChange = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(){
    this.storeLocation()
  }

  storeLocation(){
    // console.debug('URL: ', window.history)
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password)
        .subscribe(
          result => {

                this.getCurrentUser(result)
                this.router.navigate(['/']);
                // this.goBack();
          },
          error => {
            this.error = 'Username or password is incorrect',
            this.loading = false}
        );
  }

  goBack(): void {
    this.location.back();
    // window.history.back()
  }

  getCurrentUser(access_token: any){
    this.authService.getCurrentUser(access_token).then(currentUser =>{
      // this.user = currentUser
      // console.debug("THISUSER: ", this.user )
      let cu = JSON.parse(localStorage.getItem('currentUser'))
      console.debug("CU: ", cu)
      let strUsr = JSON.stringify({
        email: currentUser.email,
        is_admin: currentUser.is_admin,
        created_at: cu.created_at,
        expires_in: cu.expires_in,
        access_token: cu.access_token,
        refresh_token: cu.refresh_token,
      })
      // this.localStorageChange.emit({
      //   currentUser: strUsr
      // })
      localStorage.setItem('currentUser', strUsr );
    })

  }

  logout(){
    this.authService.logout()
    // this.loggedIn = false
    // this.loginChanged.emit({
    //   loggedIn: this.loggedIn
    // })
  }

  raisePermError(){
    this.authService.raisePermError()
  }
}
