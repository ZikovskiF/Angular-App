import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkTileComponent } from './bookmark-tile.component';

describe('BookmarkTileComponent', () => {
  let component: BookmarkTileComponent;
  let fixture: ComponentFixture<BookmarkTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarkTileComponent]
    });
    fixture = TestBed.createComponent(BookmarkTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
