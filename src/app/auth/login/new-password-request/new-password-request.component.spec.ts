import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordRequestComponent } from './new-password-request.component';

describe('NewPasswordRequestComponent', () => {
  let component: NewPasswordRequestComponent;
  let fixture: ComponentFixture<NewPasswordRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewPasswordRequestComponent]
    });
    fixture = TestBed.createComponent(NewPasswordRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
