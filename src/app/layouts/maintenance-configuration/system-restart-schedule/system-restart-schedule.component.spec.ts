import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemRestartScheduleComponent } from './system-restart-schedule.component';

describe('SystemRestartScheduleComponent', () => {
  let component: SystemRestartScheduleComponent;
  let fixture: ComponentFixture<SystemRestartScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemRestartScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemRestartScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
