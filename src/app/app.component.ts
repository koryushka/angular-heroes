import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import { User } from './_models/user'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]

})
export class AppComponent implements OnInit {
  title = 'app works!';
  currentUser:User;
  seconds:number = 0;
  intervalId=0;

  constructor(private authService: AuthService, private router: Router){
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.debug("CONSTR INIT")
    authService.localStorageChanged$.subscribe(
      currentUser => {
        console.debug("CU: ", localStorage.getItem('currentUser'))
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.seconds = 0;
        if(this.currentUser){
          let refresh_token = this.currentUser.refresh_token
          let access_token_created_at: any  = this.currentUser.access_token_created_at
          let expires_in: any = this.currentUser.expires_in
          let timeNow = new Date().valueOf()/1000;
          let loggedInTime = timeNow - access_token_created_at;
          let tokenIsExpired = expires_in < loggedInTime
          let timeRemain = expires_in - loggedInTime
          console.debug("expires_in: ", expires_in)
          console.debug("loggedInTime: ", loggedInTime)
          console.debug("timeRemain: ", timeRemain)

          this.intervalId = window.setInterval(() => {
            this.seconds += 1;
            console.debug("SECONDS: ", this.seconds)
            if(this.seconds === Math.round(timeRemain)){
              // this.logout();
              this.refreshToken(refresh_token);

              this.seconds = 0;
              clearInterval(this.intervalId);
            }
          }, 1000);
          console.debug("loggedInTime: ", loggedInTime)
          console.debug("Expired?: ", tokenIsExpired)

        }
      }
    );
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(this.currentUser){
      let refresh_token = this.currentUser.refresh_token
      let access_token_created_at: any  = this.currentUser.access_token_created_at
      let expires_in: any = this.currentUser.expires_in
      let timeNow = new Date().valueOf()/1000;
      let loggedInTime = timeNow - access_token_created_at;
      let tokenIsExpired = expires_in < loggedInTime
      let timeRemain = expires_in - loggedInTime
      console.debug("expires_in: ", expires_in)
      console.debug("loggedInTime: ", loggedInTime)
      console.debug("timeRemain: ", timeRemain)
      if(timeRemain < 0){ this.logout()}
      this.seconds = Math.round(timeRemain);

      this.intervalId = window.setInterval(() => {
        this.seconds -= 1;
        console.debug("SECONDS: ", this.seconds)
        if(this.seconds === 0){
          // this.logout();
          this.refreshToken(refresh_token);
          clearInterval(this.intervalId);
        }
      }, 1000);
      console.debug("loggedInTime: ", loggedInTime)
      console.debug("Expired?: ", tokenIsExpired)

    }
    // if(this.currentUser){
    //   let refresh_token = this.currentUser.refresh_token
    //   let access_token_created_at: any  = this.currentUser.access_token_created_at
    //   let expires_in: any = this.currentUser.expires_in
    //   let timeNow = new Date().valueOf()/1000;
    //   let loggedInTime = timeNow - access_token_created_at;
    //   let tokenIsExpired = expires_in < loggedInTime
    //   if(tokenIsExpired){
    //     this.authService.refreshToken(refresh_token).subscribe(
    //               result => {
    //
    //                   console.debug("RESULT: ", result)
    //                     // this.goBack();
    //               },
    //               error => {
    //               console.debug("ERROR: ", error)
    //              }
    //             );
    //   }
    // }
  }

  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    // if(this.currentUser){
    //   let refresh_token = this.currentUser.refresh_token
    //   let access_token_created_at: any  = this.currentUser.access_token_created_at
    //   let expires_in: any = this.currentUser.expires_in
    //   let timeNow = new Date().valueOf()/1000;
    //   let loggedInTime = timeNow - access_token_created_at;
    //   let tokenIsExpired = expires_in < loggedInTime
    //   console.debug("expires_in: ", expires_in)
    //   console.debug("loggedInTime: ", loggedInTime)
    //
    //   // if(tokenIsExpired){
    //   //   // this.authService.refreshToken(refresh_token).subscribe(
    //   //   //           result => {
    //   //   //
    //   //   //               console.debug("RESULT: ", result)
    //   //   //                 // this.goBack();
    //   //   //           },
    //   //   //           error => {
    //   //   //           console.debug("ERROR: ", error)
    //   //   //          }
    //   //   //         );
    //   //   this.authService.logout()
    //   // } else {
    //   //   window.setInterval(() => {
    //   //     this.seconds += 1;
    //   //     console.debug("SECONDS: ", this.seconds)
    //   //     if(this.seconds === 10){
    //   //       this.authService.logout();
    //   //       clearInterval(this.seconds);
    //   //     }
    //   //   }, 1000);
    //   // }

  }

  refreshToken(refresh_token: string){
    this.authService.refreshToken(refresh_token).subscribe(
                 result => {

                     console.debug("RESULT: ", result)
                       // this.goBack();
                 },
                 error => {
                 console.debug("ERROR: ", error)
                }
               );
  }

  logout(){
    this.router.navigate(['/welcome'])
    this.authService.logout();
    clearInterval(this.intervalId);
  }
}
