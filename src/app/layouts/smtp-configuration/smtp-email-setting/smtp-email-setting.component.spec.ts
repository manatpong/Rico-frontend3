import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpEmailSettingComponent } from './smtp-email-setting.component';

describe('SmtpEmailSettingComponent', () => {
  let component: SmtpEmailSettingComponent;
  let fixture: ComponentFixture<SmtpEmailSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmtpEmailSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtpEmailSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
