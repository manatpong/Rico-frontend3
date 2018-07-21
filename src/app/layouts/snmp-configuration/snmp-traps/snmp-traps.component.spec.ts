import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnmpTrapsComponent } from './snmp-traps.component';

describe('SnmpTrapsComponent', () => {
  let component: SnmpTrapsComponent;
  let fixture: ComponentFixture<SnmpTrapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnmpTrapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnmpTrapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
