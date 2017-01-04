import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

import { User } from './_models/user'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]

})
export class AppComponent {
  title = 'app works!';
  currentUser:User;
  constructor(private authService: AuthService, private router: Router){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    authService.localStorageChanged$.subscribe(
      currentUser => {
        console.debug("CU: ", localStorage.getItem('currentUser'))
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
      }
    );
  }

  logout(){
    this.router.navigate(['/welcome'])
    this.authService.logout();
  }
}
