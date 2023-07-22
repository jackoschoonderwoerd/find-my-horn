import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHornsComponent } from './my-horns.component';

describe('MyHornsComponent', () => {
  let component: MyHornsComponent;
  let fixture: ComponentFixture<MyHornsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyHornsComponent]
    });
    fixture = TestBed.createComponent(MyHornsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
