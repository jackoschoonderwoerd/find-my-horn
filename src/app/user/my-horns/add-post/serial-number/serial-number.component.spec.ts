import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialNumberComponent } from './serial-number.component';

describe('SerialNumberComponent', () => {
  let component: SerialNumberComponent;
  let fixture: ComponentFixture<SerialNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SerialNumberComponent]
    });
    fixture = TestBed.createComponent(SerialNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
