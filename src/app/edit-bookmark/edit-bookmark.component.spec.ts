import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookmarkComponent } from './edit-bookmark.component';

describe('EditBookmarkComponent', () => {
  let component: EditBookmarkComponent;
  let fixture: ComponentFixture<EditBookmarkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBookmarkComponent]
    });
    fixture = TestBed.createComponent(EditBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
