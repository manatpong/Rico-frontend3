import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WestPortComponent } from './west-port.component';

describe('WestPortComponent', () => {
  let component: WestPortComponent;
  let fixture: ComponentFixture<WestPortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WestPortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WestPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
