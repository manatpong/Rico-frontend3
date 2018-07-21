import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EastPortDescriptionTableComponent } from './east-port-description-table.component';

describe('EastPortDescriptionTableComponent', () => {
  let component: EastPortDescriptionTableComponent;
  let fixture: ComponentFixture<EastPortDescriptionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EastPortDescriptionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EastPortDescriptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
