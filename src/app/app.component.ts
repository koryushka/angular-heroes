import { Component } from '@angular/core';
import { UserService } from './_services/user.service';
import { Router } from '@angular/router';

import { User } from './_models/user'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent {
  title = 'app works!';
  loggedIn = !!localStorage.getItem('currentUser');
  constructor(private userService: UserService){
    
  }
  myValueChange(event) {
    console.log("MyEvent: ",event);
    this.loggedIn = event.loggedIn
  }
}
