import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {

  bookmark!: Bookmark

  constructor (private bookmarkService: BookmarkService,
     private route: ActivatedRoute,
     private router: Router,
     private notificaionService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkId = paramMap.get('id')
    
      // this.bookmark = this.bookmarkService.getBookmark(bookmarkId!)  
      const retrievedBookmark = this.bookmarkService.getBookmark(bookmarkId!);
      if (retrievedBookmark !== undefined) {
        this.bookmark = retrievedBookmark;
      } else {
        throw new Error('Note not found');
      }
    
    })
  }

  onFormSubmit(form: NgForm) {
    const { name, url } = form.value
   this.bookmarkService.updateBookmark(this.bookmark.id, {
    name,
    url: new URL(url)
   })
   
   this.notificaionService.show('Bookmark Updated!')
  }

  delete() {
    this.bookmarkService.deleteBookmark(this.bookmark.id)
    this.router.navigateByUrl('/bookmarks/manage')
    this.notificaionService.show('Bookmark deleted!')
  }
}
