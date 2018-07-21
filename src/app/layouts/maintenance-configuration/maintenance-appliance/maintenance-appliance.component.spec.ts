import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceApplianceComponent } from './maintenance-appliance.component';

describe('MaintenanceApplianceComponent', () => {
  let component: MaintenanceApplianceComponent;
  let fixture: ComponentFixture<MaintenanceApplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceApplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceApplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
