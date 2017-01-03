// login.component.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers:[AuthService]
})
export class LoginComponent {
  title = 'app works!';
  error = '';
  loading:boolean;
  model: any = {};
  currentUser: string;
  user: User;
  // user: User;
  // currentEmail: string;
  // loggedIn: boolean;
  permissionsError: boolean;
  // @Input() userLoggedIn:boolean;

  constructor(private authService: AuthService, private router: Router) {
    // var currentUser = JSON.parse(localStorage.getItem('currentUser'))
    // this.loggedIn = !!localStorage.getItem('currentUser');
    // this.currentEmail = this.userService.email || localStorage.getItem('currentUser');
  }

  // onSubmit(email, password) {
  //   return this.authService.login(email, password)
  //   // console.debug("CU: ", currentUser)
  //     .subscribe((result) => {
  //       // .toPromise()
  //       // .then((result) =>{
  //         console.debug("RESULT: ", result);
  //
  //         if (result) {
  //           // this.getCurrentUser(result.access_token)
  //           // this.getCurrentUser(result.access_token).then(user => {
  //           //   localStorage.setItem('currentUser', JSON.stringify({email: user.email, is_admin: user.is_admin, access_token: res.access_token}));
  //           // })
  //
  //           // this.router.navigate(['/heroes']);
  //           console.debug("OnSubmitUser: ", this.authService.currentUser)
  //       }
  //     });
  // }

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password)
        .subscribe(
          result => {

                this.getCurrentUser(result)
                this.router.navigate(['/']);
          },
          error => {
            this.error = 'Username or password is incorrect',
            this.loading = false}
        );
}

  getCurrentUser(access_token: any){
    this.authService.getCurrentUser(access_token).then(currentUser =>{
      // this.user = currentUser
      // console.debug("THISUSER: ", this.user )
      let cu = JSON.parse(localStorage.getItem('currentUser'))
      localStorage.setItem('currentUser', JSON.stringify({ email: cu.email, token: cu.token, is_admin: currentUser.is_admin }));

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
