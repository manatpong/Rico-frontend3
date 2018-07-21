import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationAndConnectionLogComponent } from './operation-and-connection-log.component';

describe('OperationAndConnectionLogComponent', () => {
  let component: OperationAndConnectionLogComponent;
  let fixture: ComponentFixture<OperationAndConnectionLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationAndConnectionLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationAndConnectionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
