import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueEastPortComponent } from './queue-east-port.component';

describe('QueueEastPortComponent', () => {
  let component: QueueEastPortComponent;
  let fixture: ComponentFixture<QueueEastPortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueEastPortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueEastPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
