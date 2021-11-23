import { Injectable } from '@angular/core';
import { Task } from '../interface/task-interface';
import { v4 as uuidv4 } from 'uuid';
import {
  addNewTaskAction,
  changeTaskStatusAction,
  deleteTaskAction,
  selectAllTaskAction,
  deleteCompletedTaskAction, setOriginTasksTaskAction
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
    this.apiService.getAllTasks().subscribe(data => {
      this.store.dispatch(setOriginTasksTaskAction({ tasks: data }));
    });
  }

  addNew(text: string): void {
    this.apiService.addNewTask(text).subscribe(data => {
      this.store.dispatch(addNewTaskAction({ task: data }));
    });
  }

  changeStatus(id: number, isComplete: boolean): void {
    this.apiService.changeTaskStatus(id, isComplete).subscribe(data => {
      this.store.dispatch(changeTaskStatusAction({ id, isComplete }));
    });
  }

  deleteTask(id: number): void {
    this.apiService.deleteTask(id).subscribe(() => {
      this.store.dispatch(deleteTaskAction({ id }));
    });
  }

  selectAll() {
    this.apiService.completeAllTasks().subscribe(() => {
      this.store.dispatch(selectAllTaskAction());
    });
  }

  deleteCompleted() {
    this.apiService.deleteCompleteTasks().subscribe(() => {
      this.store.dispatch(deleteCompletedTaskAction());
    });
  }

  getByFilter(isCompleted: boolean): Task[] {
    return this.tasks.filter(task => task.isComplete === isCompleted);
  }
}
