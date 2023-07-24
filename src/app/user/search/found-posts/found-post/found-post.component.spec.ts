import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundPostComponent } from './found-post.component';

describe('FoundPostComponent', () => {
  let component: FoundPostComponent;
  let fixture: ComponentFixture<FoundPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FoundPostComponent]
    });
    fixture = TestBed.createComponent(FoundPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
