import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateOfPurchaseComponent } from './date-of-purchase.component';

describe('DateOfPurchaseComponent', () => {
  let component: DateOfPurchaseComponent;
  let fixture: ComponentFixture<DateOfPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DateOfPurchaseComponent]
    });
    fixture = TestBed.createComponent(DateOfPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
