import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNameComponent } from './display-name.component';

describe('DisplayNameComponent', () => {
  let component: DisplayNameComponent;
  let fixture: ComponentFixture<DisplayNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DisplayNameComponent]
    });
    fixture = TestBed.createComponent(DisplayNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
