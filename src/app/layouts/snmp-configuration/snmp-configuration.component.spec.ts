import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnmpConfigurationComponent } from './snmp-configuration.component';

describe('SnmpConfigurationComponent', () => {
  let component: SnmpConfigurationComponent;
  let fixture: ComponentFixture<SnmpConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnmpConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnmpConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
