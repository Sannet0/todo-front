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
import { tasks, tasksCount, tasksLeftCount } from '../state/tasks/tasks.selector';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';

export enum FilterType {
  all,
  completed,
  active
}

@Injectable({
  providedIn: 'root'
})
export class TaskStateFacadeService {
  constructor(private apiService: ApiService, private store: Store<{ tasks: Task[] }>) {
  }

  private filterType$ = new BehaviorSubject<FilterType>(FilterType.all);
  tasks$ = this.store.select(tasks);
  taskCount$ = this.store.select(tasksCount);
  tasksLeftCount$ = this.store.select(tasksLeftCount);
  filteredTasks$ = combineLatest(
    this.tasks$,
    this.filterType$
  ).pipe(
    map(([tasks, filterType]) => tasks.filter(task => this.filterTasksExpression(task, filterType)))
  );


  getAll(): void {
    this.store.dispatch(loadTasks());
  }

  addNew(text: string): void {
    this.store.dispatch(addTask({ text }));
  }

  changeStatus(id: number, isCompleted: boolean): void {
    this.store.dispatch(changeTaskStatus({ id, isCompleted }));
  }

  deleteTask(id: number): void {
    this.store.dispatch(deleteTask({ id }));
  }

  selectAll(): void {
    this.store.dispatch(selectAllTask());
  }

  deleteCompleted(): void {
    this.store.dispatch(deleteCompletedTask());
  }

  private filterTasksExpression(task: Task, type: FilterType): boolean {
    if (type === FilterType.all) {
      return true;
    }
    if (type === FilterType.completed && task.isCompleted) {
      return true;
    }
    return type === FilterType.active && !task.isCompleted;
  }

  setFilterType(type: FilterType): void {
    this.filterType$.next(type);
  }
}
