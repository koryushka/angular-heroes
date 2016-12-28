// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  onSubmit(email, password) {
    console.debug('SUB: ', email)

    this.userService.login(email, password)
      .subscribe((result) => {
        console.debug('RESP: ', result)
        
        if (result) {
          console.debug('RESP: ', result)
          this.router.navigate(['']);
        }
      });

  }
}
