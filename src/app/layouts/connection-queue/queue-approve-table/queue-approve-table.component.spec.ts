import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueApproveTableComponent } from './queue-approve-table.component';

describe('QueueApproveTableComponent', () => {
  let component: QueueApproveTableComponent;
  let fixture: ComponentFixture<QueueApproveTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueApproveTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueApproveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
