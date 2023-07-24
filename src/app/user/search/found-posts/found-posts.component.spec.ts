import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundPostsComponent } from './found-posts.component';

describe('FoundPostsComponent', () => {
  let component: FoundPostsComponent;
  let fixture: ComponentFixture<FoundPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FoundPostsComponent]
    });
    fixture = TestBed.createComponent(FoundPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
