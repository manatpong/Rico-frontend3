import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpEmailAlertSettingComponent } from './smtp-email-alert-setting.component';

describe('SmtpEmailAlertSettingComponent', () => {
  let component: SmtpEmailAlertSettingComponent;
  let fixture: ComponentFixture<SmtpEmailAlertSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmtpEmailAlertSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtpEmailAlertSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
