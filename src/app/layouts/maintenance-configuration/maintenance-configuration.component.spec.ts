import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceConfigurationComponent } from './maintenance-configuration.component';

describe('MaintenanceConfigurationComponent', () => {
  let component: MaintenanceConfigurationComponent;
  let fixture: ComponentFixture<MaintenanceConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
