import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Service
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService) { }

  canActivate() {

    let currentUser: object;
    const remember_user_data = JSON.parse(localStorage.getItem('userData'));
    this._authenticationService.current_user_data.subscribe(data => currentUser = data);

    if (currentUser || remember_user_data) {
      return true;
    }

    this._router.navigate(['/login']);
    return false;

  }

}
