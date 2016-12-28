// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // constructor(private userService: UserService, private router: Router) {
  //   this.loggedIn = !!localStorage.getItem('currentUser');
  // }
  // loggedIn:boolean;
  // onSubmit(email, password) {
  //   this.userService.login(email, password)
  //     .subscribe((result) => {
  //       if (result) {
  //         this.router.navigate(['']);
  //       }
  //     });
  //
  // }
  //
  // logout(){
  //   this.userService.logout()
  //   this.loggedIn = false
  // }
}
