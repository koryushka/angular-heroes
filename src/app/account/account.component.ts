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
    console.debug("ACCOUNT INIT CU: ",this.currentUser )

    let access_token = this.currentUser.access_token
    let refresh_token = this.currentUser.refresh_token
    let access_token_created_at = this.currentUser.access_token_created_at
    let expires_in = this.currentUser.expires_in


    this.authService.getCurrentUser(access_token).then(
      (result) => {
        this.currentUser = result
        this.currentUser.access_token = access_token
        this.currentUser.refresh_token = refresh_token
        this.currentUser.access_token_created_at = access_token_created_at
        this.currentUser.expires_in = expires_in




        console.debug("RESULT ", this.currentUser)

        // console.debug("RESULT ", result)
      }
    )
  }
}
