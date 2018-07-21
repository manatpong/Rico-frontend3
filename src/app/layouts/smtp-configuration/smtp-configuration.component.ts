import { Component, OnInit } from '@angular/core';

// Service
import { MenuDataService } from '../../@shared/service/menu_data.service';

@Component({
  selector: 'app-smtp-configuration',
  templateUrl: './smtp-configuration.component.html',
  styleUrls: ['./smtp-configuration.component.scss']
})
export class SmtpConfigurationComponent implements OnInit {

  constructor(private _menuDataService: MenuDataService) {

    this._menuDataService.updateSelectedMenu('smpt_configuration');

  }

  ngOnInit() {
  }

}
