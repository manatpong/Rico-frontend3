import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service
import { MenuDataService } from '../../@shared/service/menu_data.service';

// Environment
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-system-configuration',
  templateUrl: './system-configuration.component.html',
  styleUrls: ['./system-configuration.component.scss']
})
export class SystemConfigurationComponent implements OnInit {

  constructor(
    private _router: Router,
    private _menuDataService: MenuDataService) {

    this._menuDataService.updateSelectedMenu('settings_configuration');

  }

  enable_auto_slide: boolean = environment.enableAutoSlide;

  ngOnInit() {

    this.autoRoute();

  }

  async autoRoute() {

    if (this.enable_auto_slide === true) {
      await this.delay(7000);
      this._router.navigate(['/']);
    }

  }

  delay(ms: number) {

    return new Promise(resolve => setTimeout(resolve, ms));

  }

}
