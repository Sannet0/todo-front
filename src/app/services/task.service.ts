import { Injectable } from '@angular/core';
import { Task } from '../interface/task-interface';
import {
  loadTasks,
  addTask,
  changeTaskStatus,
  deleteTask,
  deleteCompletedTask,
  selectAllTask
} from '../state/tasks/tasks.actions';
import { Store } from '@ngrx/store';
import { tasks } from '../state/tasks/tasks.selector';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks$ = this.store.select(tasks);
  tasks: Task[];

  constructor(private apiService: ApiService, private store: Store<{ tasks: Task[] }>) {
    this.tasks$.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  getAll(): void {
    this.store.dispatch(loadTasks());
  }

  addNew(text: string): void {
    this.store.dispatch(addTask({ text }));
  }

  changeStatus(id: number, isComplete: boolean): void {
    this.store.dispatch(changeTaskStatus({ id, isComplete }));
  }

  deleteTask(id: number): void {
    this.store.dispatch(deleteTask({ id }));
  }

  selectAll() {
    this.store.dispatch(selectAllTask());
  }

  deleteCompleted() {
    this.store.dispatch(deleteCompletedTask());
  }

  getByFilter(isCompleted: boolean): Task[] {
    return this.tasks.filter(task => task.isComplete === isCompleted);
  }
}
