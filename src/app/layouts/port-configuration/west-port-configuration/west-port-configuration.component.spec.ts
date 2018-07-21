import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WestPortConfigurationComponent } from './west-port-configuration.component';

describe('WestPortConfigurationComponent', () => {
  let component: WestPortConfigurationComponent;
  let fixture: ComponentFixture<WestPortConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WestPortConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WestPortConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
