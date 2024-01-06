import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  todo!: Todo
  

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const todoId = paramMap.get('id')


      const retrievedTodo = this.todoService.getTodo(todoId!);
      if (retrievedTodo !== undefined) {
        this.todo = retrievedTodo;
      } else {
        throw new Error('Todo not found');
      }
    })
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return
    this.todoService.updateTodo(this.todo.id, form.value)
    this.router.navigateByUrl("/todos")
    this.notificationService.show('Todo updated!')
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.id)
    this.router.navigateByUrl("/todos")
    this.notificationService.show('Todo deleted!')
  }
}

