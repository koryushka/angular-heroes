// login.component.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';


@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {}
