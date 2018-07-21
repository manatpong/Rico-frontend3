import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EastPortConfigurationComponent } from './east-port-configuration.component';

describe('EastPortConfigurationComponent', () => {
  let component: EastPortConfigurationComponent;
  let fixture: ComponentFixture<EastPortConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EastPortConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EastPortConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
