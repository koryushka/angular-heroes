// login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';


@Component({
  selector: 'account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  currentUser:User;
  constructor(private authService:AuthService ){}

  ngOnInit(){
    this.getAccount()
  }

  getAccount(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.debug("RESULT ", localStorage.getItem('currentUser'))

    let access_token = JSON.parse(localStorage.getItem('currentUser')).access_token
    this.authService.getCurrentUser(access_token).then(
      (result) => {
        // this.currentUser = result
        // console.debug("RESULT ", localStorage.getItem('currentUser'))
      }
    )
  }
}
