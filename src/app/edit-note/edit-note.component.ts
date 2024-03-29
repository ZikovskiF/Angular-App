import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/note.model';
import { NotificationService } from '../shared/notification.service';


@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  note!: Note

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id')

      // this.note = this.noteService.getNote(idParam!)  
      const retrievedNote = this.noteService.getNote(idParam!);
      if (retrievedNote !== undefined) {
        this.note = retrievedNote;
      } else {
        throw new Error('Note not found');
      }

    })
  }

  onFormSubmit(form: NgForm) {

    if (form.invalid)  return;

    this.noteService.updateNote(this.note.id, form.value)
    this.router.navigateByUrl("/notes")
    this.notificationService.show('Note updated!')
  }

  deleteNote() {
    this.noteService.deleteNote(this.note.id)
    this.router.navigateByUrl("/notes")
    this.notificationService.show('Note deleted!')
  }
}
