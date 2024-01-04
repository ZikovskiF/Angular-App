import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[] = [
    new Note('Test title', 'test content!'),
    new Note('Hey!', 'Testing 123!')
  ]

  constructor() { }

  getNotes() {
    return this.notes
  }

  getNote(id:string) {
  return this.notes.find(n => n.id === id)
  }

  addNote(note: Note) {
    this.notes.push(note)
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
  
    if (note) {
      Object.assign(note, updatedFields);
    } else {
      console.error(`Note with ID ${id} not found`);
    }
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id)
    this.notes.splice(noteIndex, 1)
  }
}