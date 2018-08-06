import { SmtpConfigurationService } from './../../@shared/service/smtp_configuration.service';
import { Component, OnInit } from '@angular/core';

// Service
import { MenuDataService } from '../../@shared/service/menu_data.service';

@Component({
  selector: 'app-smtp-configuration',
  templateUrl: './smtp-configuration.component.html',
  styleUrls: ['./smtp-configuration.component.scss']
})
export class SmtpConfigurationComponent implements OnInit {

  constructor(
    private _menuDataService: MenuDataService,
    private _smtpConfigurationService: SmtpConfigurationService) {

    this._menuDataService.updateSelectedMenu('smpt_configuration');

  }

  use_authentication: number;
  internet_security: string;
  smtp_data: object;

  sv_name: string;
  set_port: number;
  set_username: string;
  set_password: string;
  set_tls: number;
  set_ssl: number;

  clear_data: boolean = true;



  ngOnInit() {
    // this.set_tls = 0;
    // this.set_ssl = 1;
    this.fetchSmtpSetting();
  }

  fetchSmtpSetting() {
    this._smtpConfigurationService.getSmtpSetting().then((data) => {
      this.set_username = data['username'];
      this.sv_name = data['host_name'];
      this.set_port = data['port'];
      this.set_password = data['password'];
      this.use_authentication = data['auth'];
      this.set_tls = data['tls_protocol'];
      this.set_ssl = data['ssl_protocol'];
      console.log(this.use_authentication,'ll',this.set_tls,this.set_ssl)
    })
  }

  toggleAuth() {
    if (this.use_authentication == 0) {
      this.use_authentication = 1;
    } else {
      this.use_authentication = 0;
    }
    console.log(this.use_authentication);
  }
  

  toggleInternetSecurity() {
    if (this.set_tls == 0) {
      this.set_tls = 1;
      this.set_ssl = 0;
    } else {
      this.set_tls = 0;
      this.set_ssl = 1;
    }
    console.log('tls', this.set_tls);
    console.log('ssl', this.set_ssl);
  }

  sendEmailSetting() {
    // 
    this.clear_data = true;
    if(this.use_authentication == 0) {
      this.set_username = null;
      this.set_password = null;
    }
    this._smtpConfigurationService.sendSettingSMTP(this.sv_name,this.set_port, this.set_username, this.set_password, this.use_authentication, this.set_tls,this.set_ssl).then((data) => {
      console.log(this.sv_name, this.set_port, this.set_username, this.set_password, this.set_tls,this.set_ssl)
      alert(data['status'])
    })
  }

  clearEmailSetting() {
    
    if(this.clear_data) {
      this.clear_data = false;
      this.sv_name = '';
    this.set_port = null;
    this.set_username = '';
    this.set_password = '';
    this.use_authentication = 0;
    this.set_tls = 1;
    this.set_ssl = 0;
    } else {
      this.clear_data = true;
      this.fetchSmtpSetting();
    }
  }
}
