import { Injectable, OnDestroy } from '@angular/core';
import { Note } from './note.model';
import { Subscription, from, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {

  notes: Note[] = []

  storageListenSub!: Subscription

  constructor() {
    this.loadState()

    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage')
      .subscribe((event: StorageEvent) => {
        if (event.key === 'notes') this.loadState()
      });

  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getNotes() {
    return this.notes
  }

  getNote(id: string) {
    return this.notes.find(n => n.id === id)
  }

  addNote(note: Note) {
    this.notes.push(note)

    this.saveState()
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);

    if (note) {
      Object.assign(note, updatedFields);
    } else {
      console.error(`Note with ID ${id} not found`);
    }

    this.saveState();
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id)
    this.notes.splice(noteIndex, 1)

    this.saveState()
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }

  loadState() {
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes') as any)
      // if(!notesInStorage) return

      this.notes.length = 0 //clears notes array and keeps ref
      this.notes.push(...notesInStorage)

    } catch (e) {
      console.log('There was an error retrieving notes from local storage', e)
    }

    // const notesInStorage = localStorage.getItem('notes');

    // if (notesInStorage !== null) {
    //   const parsedNotes = JSON.parse(notesInStorage);
    // } else {
    //   console.error('No notes found in storage.');
    // }
    // NOT USED NOT USED NOT USED
    // if (notesInStorage && typeof notesInStorage === 'string') {
    //   try {
    //     this.notes = JSON.parse(notesInStorage);
    //   } catch (error) {
    //     console.error('Error parsing notes from storage:', error);
    //   }
    // }
  }
}
