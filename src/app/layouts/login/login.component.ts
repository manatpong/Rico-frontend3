import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service
import { AuthenticationService } from '../../@shared/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService) { }

  error_message: string;
  hide_error_message: boolean = true;
  is_remember: boolean = false;
  current_user: any = this._authenticationService.getUser();
  model: any = {};

  ngOnInit() {

    this.checkUser();

  }

  checkUser() {

    if (this.current_user['username'] && this.current_user['level']) {
      this._router.navigate(['/']);
    }

  }

  login() {

    if (this.is_remember === true) {
      this._authenticationService.login(this.model.username, this.model.password).then((data) => {
        if (data['username'] && data['level']) {
          this._authenticationService.fetchUser({
            'username': data['username'],
            'level': data['level']
          });
          localStorage.setItem('userData', JSON.stringify({ 'username': data['username'], 'level': data['level'] }));
          this._router.navigate(['/']);
        } else {
          this.error_message = data['status'];
        }
      });
    } else {
      this._authenticationService.login(this.model.username, this.model.password).then((data) => {
        if (data['username'] && data['level']) {
          this._authenticationService.fetchUser({
            'username': data['username'],
            'level': data['level']
          });
          this._router.navigate(['/']);
        } else {
          this.error_message = data['status'];
        }
      });
    }

  }

  validateLoginButton() {

    if (this.model.username && this.model.password) {
      return true;
    } else {
      this.hide_error_message = false;
      return false;
    }

  }

  catchEnter(e) {

    if (e.keyCode === 13) {

      if ((this.model.username && this.model.username !== '') && (this.model.password && this.model.password !== '')) {
        this.login();
      }

    }

  }

}
