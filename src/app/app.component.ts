import { Component } from '@angular/core';
import { UserService } from './login/user.service';
import { Router } from '@angular/router';

import { User } from './login/user'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  user: User;
  currentEmail: string;
  loggedIn: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.loggedIn = !!localStorage.getItem('currentUser') || this.userService.loggedIn;
    this.currentEmail = localStorage.getItem('currentUser')
    console.debug("Logged in: ", this.userService.loggedIn)

  }
  onSubmit(email, password) {
    this.userService.login(email, password)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['']);
        }
      });

  }

  logout(){
    this.userService.logout()
    this.loggedIn = false
  }
}
