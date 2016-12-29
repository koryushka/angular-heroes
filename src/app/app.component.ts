import { Component } from '@angular/core';
import { UserService } from './login/user.service';
import { Router } from '@angular/router';

import { User } from './login/user'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent {
  title = 'app works!';
  loggedIn = !!localStorage.getItem('currentUser');
  constructor(private userService: UserService){}
  myValueChange(event) {
    console.log("MyEvent: ",event);
    this.loggedIn = event.loggedIn
  }
}
