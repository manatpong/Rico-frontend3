import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule,
  MatPaginatorModule, MatSortModule, MatChipsModule, MatProgressSpinnerModule,
  MatTooltipModule, MatInputModule, MatFormFieldModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatDialogModule,
  MatSliderModule, MatSlideToggleModule, MatButtonToggleModule, MatRadioModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//  APP COMPONENT
import { AppComponent } from './app.component';

// NAVBAR COMPONENT
import { NavbarComponent } from './layouts/navbar/navbar.component';

// DASHBOARD COMPONENTS
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { TotalConnectionComponent } from './layouts/dashboard/total-connection/total-connection.component';
import { SystemHealthComponent } from './layouts/dashboard/system-health/system-health.component';
import { FrontPanelComponent } from './layouts/dashboard/front-panel/front-panel.component';
import { SystemSummaryComponent } from './layouts/dashboard/system-summary/system-summary.component';

// PORT CONNECTION COMPONENTS
import { PortConnectionComponent } from './layouts/port-connection/port-connection.component';
import { EastPortComponent } from './layouts/port-connection/east-port/east-port.component';
import { WestPortComponent } from './layouts/port-connection/west-port/west-port.component';
import { SequenceTableComponent } from './layouts/port-connection/sequence-table/sequence-table.component';
import { ErrorDialogComponent } from './layouts/port-connection/error-dialog/error-dialog.component';
import { ErrorResetComponent } from './layouts/port-connection/error-reset/error-reset.component';

// CONNECTION QUEUE COMPONENTS
import { ConnectionQueueComponent } from './layouts/connection-queue/connection-queue.component';
import { QueueApproveTableComponent } from './layouts/connection-queue/queue-approve-table/queue-approve-table.component';
import { QueueTableComponent } from './layouts/connection-queue/queue-table/queue-table.component';
import { QueueEastPortComponent } from './layouts/connection-queue/queue-east-port/queue-east-port.component';
import { QueueWestPortComponent } from './layouts/connection-queue/queue-west-port/queue-west-port.component';
import { QueuePanelComponent } from './layouts/connection-queue/queue-panel/queue-panel.component';
import { RemarkDialogComponent } from './layouts/connection-queue/remark-dialog/remark-dialog.component';

// OPERATION AND CONNECTION LOG COMPONENT
import {
  OperationAndConnectionLogComponent
} from './layouts/dashboard/operation-and-connection-log/operation-and-connection-log.component';

// SNMP CONFIGURATION COMPONENTS
import { SnmpConfigurationComponent } from './layouts/snmp-configuration/snmp-configuration.component';
import { SnmpV3UsersComponent } from './layouts/snmp-configuration/snmp-v3-users/snmp-v3-users.component';
import { SnmpTrapsReceiversComponent } from './layouts/snmp-configuration/snmp-traps-receivers/snmp-traps-receivers.component';
import { SnmpTrapsComponent } from './layouts/snmp-configuration/snmp-traps/snmp-traps.component';

// CURRENT CONNECTION COMPONENT
import { CurrentConnectionComponent } from './layouts/current-connection/current-connection.component';

// CONNECTION HISTORY COMPONENT
import { ConnectionHistoryComponent } from './layouts/connection-history/connection-history.component';

// ALARM HISTORY COMPONENT
import { AlarmHistoryComponent } from './layouts/alarm-history/alarm-history.component';

// PORT CONFIGURATION COMPONENTS
import { PortConfigurationComponent } from './layouts/port-configuration/port-configuration.component';
import { EastPortConfigurationComponent } from './layouts/port-configuration/east-port-configuration/east-port-configuration.component';
import { WestPortConfigurationComponent } from './layouts/port-configuration/west-port-configuration/west-port-configuration.component';
import {
  EastPortDescriptionTableComponent
} from './layouts/port-configuration/east-port-description-table/east-port-description-table.component';
import {
  WestPortDescriptionTableComponent
} from './layouts/port-configuration/west-port-description-table/west-port-description-table.component';

// SYSTEM CONFIGURATION COMPONENTS
import { SystemConfigurationComponent } from './layouts/system-configuration/system-configuration.component';
import { SystemEventsComponent } from './layouts/system-configuration/system-events/system-events.component';
import { SystemCpuUsageComponent } from './layouts/system-configuration/system-cpu-usage/system-cpu-usage.component';
import { SystemMemoryUsageComponent } from './layouts/system-configuration/system-memory-usage/system-memory-usage.component';
import { SystemDiskUsageComponent } from './layouts/system-configuration/system-disk-usage/system-disk-usage.component';
import { SystemChartComponent } from './layouts/system-configuration/system-chart/system-chart.component';
import { TemperatureChartComponent } from './layouts/system-configuration/temperature-chart/temperature-chart.component';
import { HumidityChartComponent } from './layouts/system-configuration/humidity-chart/humidity-chart.component';

// MAINTENANCE CONFIGURATION COMPONENTS
import { MaintenanceConfigurationComponent } from './layouts/maintenance-configuration/maintenance-configuration.component';
import { MaintenanceApplianceComponent } from './layouts/maintenance-configuration/maintenance-appliance/maintenance-appliance.component';

// DEBUGGING COMPONENTS
import { DebuggingComponent } from './layouts/debugging/debugging.component';
import { DebuggingClearDatabaseComponent } from './layouts/debugging/debugging-clear-database.component';
import { DebuggingClearQueueComponent } from './layouts/debugging/debugging-clear-queue.component';
import { DebuggingSystemRestartComponent } from './layouts/debugging/debugging-system-restart.component';

// SMTP CONFIGURATION COMPONENTS
import { SmtpConfigurationComponent } from './layouts/smtp-configuration/smtp-configuration.component';
import { SmtpEmailSettingComponent } from './layouts/smtp-configuration/smtp-email-setting/smtp-email-setting.component';

// LOGIN COMPONENT
import { LoginComponent } from './layouts/login/login.component';

// GUARD
import { AuthGuard } from './@shared/_guards/auth.guard';

// Third-party
import 'hammerjs';
import { ChartsModule } from 'ng2-charts';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SystemRestartScheduleComponent } from './layouts/maintenance-configuration/system-restart-schedule/system-restart-schedule.component';
import { CountdownTimerComponent } from './layouts/maintenance-configuration/countdown-timer/countdown-timer.component';
import { SmtpEmailAlertSettingComponent } from './layouts/smtp-configuration/smtp-email-alert-setting/smtp-email-alert-setting.component';
import { CameraComponent } from './layouts/camera/camera.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'port_connection',
    component: PortConnectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'connection_queue',
    component: ConnectionQueueComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'current_connection',
    component: CurrentConnectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'connection_history',
    component: ConnectionHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'debugging',
    component: DebuggingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'alarm_history',
    component: AlarmHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'camera',
    component: CameraComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'snmp_configuration',
    component: SnmpConfigurationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'port_configuration',
    component: PortConfigurationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'maintenance_configuration',
    component: MaintenanceConfigurationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'system_configuration',
    component: SystemConfigurationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'smtp_configuration',
    component: SmtpConfigurationComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    PortConnectionComponent,
    OperationAndConnectionLogComponent,
    TotalConnectionComponent,
    SystemHealthComponent,
    FrontPanelComponent,
    SystemSummaryComponent,
    EastPortComponent,
    WestPortComponent,
    SequenceTableComponent,
    SnmpConfigurationComponent,
    SnmpV3UsersComponent,
    SnmpTrapsReceiversComponent,
    CurrentConnectionComponent,
    SnmpTrapsComponent,
    ConnectionHistoryComponent,
    AlarmHistoryComponent,
    PortConfigurationComponent,
    EastPortConfigurationComponent,
    WestPortConfigurationComponent,
    EastPortDescriptionTableComponent,
    WestPortDescriptionTableComponent,
    SystemConfigurationComponent,
    SystemEventsComponent,
    SystemCpuUsageComponent,
    SystemMemoryUsageComponent,
    SystemDiskUsageComponent,
    ErrorDialogComponent,
    ErrorResetComponent,
    SystemChartComponent,
    MaintenanceConfigurationComponent,
    MaintenanceApplianceComponent,
    ConnectionQueueComponent,
    QueueTableComponent,
    QueueEastPortComponent,
    QueueWestPortComponent,
    QueuePanelComponent,
    DebuggingComponent,
    DebuggingClearQueueComponent,
    DebuggingClearDatabaseComponent,
    DebuggingSystemRestartComponent,
    TemperatureChartComponent,
    HumidityChartComponent,
    SmtpConfigurationComponent,
    SmtpEmailSettingComponent,
    LoginComponent,
    QueueApproveTableComponent,
    RemarkDialogComponent,
    SystemRestartScheduleComponent,
    CountdownTimerComponent,
    SmtpEmailAlertSettingComponent,
    CameraComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),  // <-- debugging purposes only
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatRadioModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DebuggingClearQueueComponent, DebuggingClearDatabaseComponent, DebuggingSystemRestartComponent, RemarkDialogComponent,CountdownTimerComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
