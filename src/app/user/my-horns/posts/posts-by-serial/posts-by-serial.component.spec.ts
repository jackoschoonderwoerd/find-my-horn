import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsBySerialComponent } from './posts-by-serial.component';

describe('PostsBySerialComponent', () => {
  let component: PostsBySerialComponent;
  let fixture: ComponentFixture<PostsBySerialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostsBySerialComponent]
    });
    fixture = TestBed.createComponent(PostsBySerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
