import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { LoginService} from './services/login.service';

@Injectable()


export class LoginRouteGuard implements CanActivate {

  constructor(
      private loginService: LoginService
  ) {}

  data: any;

  canActivate() {
    this.data = JSON.parse(localStorage.getItem("isLogged"));
    return this.data.trigger;
  }
}