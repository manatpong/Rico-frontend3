import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smtp-email-setting',
  templateUrl: './smtp-email-setting.component.html',
  styleUrls: ['./smtp-email-setting.component.scss']
})
export class SmtpEmailSettingComponent implements OnInit {

  constructor() { }

  ssl_value = 'false';
  tls_value = 'false';
  auth_value = 'false';

  ngOnInit() {
  }

  test() {
    console.log(typeof(this.auth_value));
    // console.log(this.auth_value);
  }


}
