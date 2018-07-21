
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortConnectionComponent } from './port-connection.component';

describe('PortConnectionComponent', () => {
  let component: PortConnectionComponent;
  let fixture: ComponentFixture<PortConnectionComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PortConnectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
