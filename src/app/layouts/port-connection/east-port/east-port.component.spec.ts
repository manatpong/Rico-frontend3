import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EastPortComponent } from './east-port.component';

describe('EastPortComponent', () => {
  let component: EastPortComponent;
  let fixture: ComponentFixture<EastPortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EastPortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EastPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
