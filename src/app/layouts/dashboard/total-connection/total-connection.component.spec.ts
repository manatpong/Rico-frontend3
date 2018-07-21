import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalConnectionComponent } from './total-connection.component';

describe('TotalConnectionComponent', () => {
  let component: TotalConnectionComponent;
  let fixture: ComponentFixture<TotalConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
