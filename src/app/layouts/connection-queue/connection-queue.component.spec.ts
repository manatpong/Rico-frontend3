import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionQueueComponent } from './connection-queue.component';

describe('ConnectionQueueComponent', () => {
  let component: ConnectionQueueComponent;
  let fixture: ComponentFixture<ConnectionQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
