import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorResetComponent } from './error-reset.component';

describe('ErrorResetComponent', () => {
  let component: ErrorResetComponent;
  let fixture: ComponentFixture<ErrorResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
