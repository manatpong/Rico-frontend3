import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueWestPortComponent } from './queue-west-port.component';

describe('QueueWestPortComponent', () => {
  let component: QueueWestPortComponent;
  let fixture: ComponentFixture<QueueWestPortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueWestPortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueWestPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
