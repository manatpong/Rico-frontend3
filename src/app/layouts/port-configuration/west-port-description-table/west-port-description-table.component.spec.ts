import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WestPortDescriptionTableComponent } from './west-port-description-table.component';

describe('WestPortDescriptionTableComponent', () => {
  let component: WestPortDescriptionTableComponent;
  let fixture: ComponentFixture<WestPortDescriptionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WestPortDescriptionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WestPortDescriptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
