import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnmpTrapsReceiversComponent } from './snmp-traps-receivers.component';

describe('SnmpTrapsReceiversComponent', () => {
  let component: SnmpTrapsReceiversComponent;
  let fixture: ComponentFixture<SnmpTrapsReceiversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnmpTrapsReceiversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnmpTrapsReceiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
