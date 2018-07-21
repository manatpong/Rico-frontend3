import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionHistoryComponent } from './connection-history.component';

describe('ConnectionHistoryComponent', () => {
  let component: ConnectionHistoryComponent;
  let fixture: ComponentFixture<ConnectionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
