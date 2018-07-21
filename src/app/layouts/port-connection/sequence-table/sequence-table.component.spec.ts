import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceTableComponent } from './sequence-table.component';

describe('SequenceTableComponent', () => {
  let component: SequenceTableComponent;
  let fixture: ComponentFixture<SequenceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
