import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnmpV3UsersComponent } from './snmp-v3-users.component';

describe('SnmpV3UsersComponent', () => {
  let component: SnmpV3UsersComponent;
  let fixture: ComponentFixture<SnmpV3UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnmpV3UsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnmpV3UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
