import { Component, OnInit } from '@angular/core';

// Service
import { MenuDataService } from '../../@shared/service/menu_data.service';


@Component({
  selector: 'app-maintenance-configuration',
  templateUrl: './maintenance-configuration.component.html',
  styleUrls: ['./maintenance-configuration.component.scss']
})
export class MaintenanceConfigurationComponent implements OnInit {

  constructor(
    private _menuDataService: MenuDataService) {

    this._menuDataService.updateSelectedMenu('maintenance_configuration');

  }

  

  ngOnInit() {
    
  }
  
  
}
