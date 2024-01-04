import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { NgForm } from '@angular/forms';
import { Todo } from '../shared/todo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit{

  showValidationErrors!: boolean;

  constructor (private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) { this.showValidationErrors = true; return; }
    const todo = new Todo(form.value.text)
    this.todoService.addTodo(todo)
    this.router.navigateByUrl('/todos')
  }
}
