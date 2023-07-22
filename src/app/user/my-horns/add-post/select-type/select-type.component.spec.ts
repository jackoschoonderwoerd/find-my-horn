import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypeComponent } from './select-type.component';

describe('SelectTypeComponent', () => {
  let component: SelectTypeComponent;
  let fixture: ComponentFixture<SelectTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectTypeComponent]
    });
    fixture = TestBed.createComponent(SelectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
