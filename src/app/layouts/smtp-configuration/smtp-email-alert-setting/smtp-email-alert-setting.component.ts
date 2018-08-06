import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SmtpConfigurationService } from '../../../@shared/service/smtp_configuration.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-smtp-email-alert-setting',
  templateUrl: './smtp-email-alert-setting.component.html',
  styleUrls: ['./smtp-email-alert-setting.component.scss']
})
export class SmtpEmailAlertSettingComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _smtpConfigurationService: SmtpConfigurationService,
  ) { }

  dataSource: any = new MatTableDataSource();
  // level = ['level_zero','level_one','level_two','level_three','level_four','level_five','level_six','level_seven'];
  
  level = [];

  tooltip_desc = [
    'System unstable',
    'Immediate action needed',
    'Critical conditions',
    'Error conditions',
    'Warning conditions',
    'Normal but significant condition',
    'Informational messages only',
    'Debugging messages'
  ];

  displayedColumns = [
    'no',
    'username',
    'surname',
    'email',
    'level',
  ];

  keywords = [
    'emergencies',
    'alert',
    'critical',
    'errors',
    'warnings',
    'notifications',
    'informational',
    'debugging'
  ]

  checked_all = false;
  indeterminate = false;
  labelPosition = 'after';

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.fetchSmtpAlert();
  }

  fetchSmtpAlert() {

    this._smtpConfigurationService.getUserSmtpAlert().then((data) => {
      _.each(data, (obj) => {
        let array = [];
        for (let i = 1; i <= 8; i++) {
          console.log('ObJ',Number(obj['level']))
          if (i <= Number(obj['level'])) {
            array.push(true);
          } else {
            array.push(false);
          }
        }
        this.level.push({ 'username': obj['username'], 'level': array });
      });
      console.log(this.level)
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data;
    })
  }

  testing(username: string, index: number) {

    const find_object = this.level.find(object => object['username'] === username);
    console.log(find_object['level'][index])
    return find_object['level'][index];

  }

  checked_item(username: string, index: number) {

    const find_index = this.level.findIndex(object => object['username'] === username)
    let boolean_value = this.level[find_index]['level'][index];
    
    for (let i = 0; i <= 7; i++) {
      if (i < index) {
        this.level[find_index]['level'][i] = true;
      }
      if (i > index){
        this.level[find_index]['level'][i] = false;
      }
    }
    if(this.level[find_index]['level'][index] === true) {
      this.level[find_index]['level'][index] = false;
      this._smtpConfigurationService.sendSettingAlert(username,index-1).then(() => {
        console.log('update')
      })
    } else {
      this.level[find_index]['level'][index] = true;
      this._smtpConfigurationService.sendSettingAlert(username,index).then(() => {
        console.log('update')
      })
    }

  }

  checkedValue(username: string ,index: number) {
    const find_object = this.level.find(object => object['username'] === username);
    
    return (find_object['level'][index] === true) ? 'checked' : '';

  }


}

