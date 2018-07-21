import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDiskUsageComponent } from './system-disk-usage.component';

describe('SystemDiskUsageComponent', () => {
  let component: SystemDiskUsageComponent;
  let fixture: ComponentFixture<SystemDiskUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDiskUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDiskUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
