import { Injectable } from '@angular/core';
import { Task } from '../interface/task-interface';
import { v4 as uuidv4 } from 'uuid';
import {
  addNewTaskAction,
  changeTaskStatusAction,
  deleteTaskAction,
  selectAllTaskAction,
  deleteCompletedTaskAction
} from '../state/tasks/tasks.actions';
import { Store } from '@ngrx/store';
import { tasks } from '../state/tasks/tasks.selector';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks$ = this.store.select(tasks);
  tasks: Task[];

  constructor(private store: Store<{ tasks: Task[] }>) {
    this.tasks$.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  addNew(text: string): void {
    this.store.dispatch(addNewTaskAction({task: {
        id: uuidv4(),
        text,
        isCompleted: false
      }}));
  }

  changeStatus(id: string, isCompleted: boolean): void {
    this.store.dispatch(changeTaskStatusAction({id, isCompleted}));
  }

  deleteTask(id: string): void {
    this.store.dispatch(deleteTaskAction({id}));
  }

  selectAll() {
    this.store.dispatch(selectAllTaskAction());
  }

  deleteCompleted() {
    this.store.dispatch(deleteCompletedTaskAction());
  }

  getByFilter(isCompleted: boolean): Task[] {
    return this.tasks.filter(task => task.isCompleted === isCompleted);
  }
}
