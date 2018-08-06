import { PageDataService } from './../../@shared/service/page_data.service';
import { DebuggingDataService } from './../debugging/@shared/services/debugging_data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../@shared/service/authentication.service';
import { DebuggingService } from '../../@shared/service/debugging.service';
import { MenuDataService } from '../../@shared/service/menu_data.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _breakpointObserver: BreakpointObserver,
    private _authenticationService: AuthenticationService,
    private _debuggingService: DebuggingService,
    private _menuDataService: MenuDataService,
    private _debuggingDataService: DebuggingDataService,
    private _pageDataService: PageDataService) { }

  current_robot_mode: string;
  current_robot_state: string;
  selected_menu: string;
  assets_path: string = environment.assetsPath;
  enable_debug: boolean = environment.enableDebugging;
  current_user: object;
  timerInterval: any;
  isHandset: Observable<BreakpointState> = this._breakpointObserver.observe(Breakpoints.Handset);

  autoStatusActive: boolean;
  autoTxt: string;

  ngOnInit() {
    this._debuggingDataService.auto_active.subscribe(data => this.autoStatusActive = data);
    this._debuggingService.current_robot_mode_data.subscribe(data => this.current_robot_mode = data);
    this._debuggingService.current_robot_state_data.subscribe(data => this.current_robot_state = data);
    this._authenticationService.current_user_data.subscribe(data => this.current_user = data);
    this._menuDataService.current_seleted_menu.subscribe(data => this.selected_menu = data);
    this.fetchRobotMode();
    this.fetchRobotState();
    this.timerInterval = setInterval(() => {
      this.fetchRobotState();
    }, 1500);

    setInterval(this.checkPageFocus, 500);
  }
  
  checkPageFocus() {
    // console.log(document.hasFocus());
    this._pageDataService.changeFocusPage(document.hasFocus())
  }

  fetchRobotMode() {

    this._debuggingService.getRobotMode().then((data) => {
      if (data['status'] === 'error') {
        this._debuggingService.fetchRobotMode('Unactive');
      } else {
        this._debuggingService.fetchRobotMode(data['mode']);
      }
    });

  }

  fetchRobotState() {

    this._debuggingService.getRobotState().then((data) => {
      if (data['status'] === 'error') {
        this._debuggingService.fetchRobotState('Unactive');
      } else {
        const robot_state = data['state'].substring(0, 1).toUpperCase() + data['state'].substring(1, );
        this._debuggingService.fetchRobotState(robot_state);
      }
    });

  }

  selectMenu(event) {

    this.selected_menu = event.currentTarget.id;

  }

  logout() {

    localStorage.removeItem('userData');
    this._authenticationService.fetchUser(null);
    this._router.navigate(['/login']);

  }


}
