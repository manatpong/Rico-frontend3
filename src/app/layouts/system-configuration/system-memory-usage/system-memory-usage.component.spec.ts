import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMemoryUsageComponent } from './system-memory-usage.component';

describe('SystemMemoryUsageComponent', () => {
  let component: SystemMemoryUsageComponent;
  let fixture: ComponentFixture<SystemMemoryUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMemoryUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMemoryUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
