// login.component.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  title = 'app works!';
  // user: User;
  currentEmail: string;
  loggedIn: boolean;
  permissionsError: boolean;
  @Input() userLoggedIn:boolean;

  @Output() loginChanged = new EventEmitter()

  constructor(private userService: UserService, private router: Router) {
    this.loggedIn = !!localStorage.getItem('currentUser');
    this.currentEmail = this.userService.email || localStorage.getItem('currentUser');
  }

  onSubmit(email, password) {
    this.userService.login(email, password)
      .subscribe((result) => {
        if (result) {
          this.currentEmail = email
          this.loggedIn = true
          this.loginChanged.emit({
            loggedIn: this.loggedIn
          })
          // this.router.navigate(['/heroes']);

        }
      });
  }

  logout(){
    this.userService.logout()
    this.loggedIn = false
    this.loginChanged.emit({
      loggedIn: this.loggedIn
    })
  }

  raisePermError(){
    this.userService.raisePermError()
  }
}
