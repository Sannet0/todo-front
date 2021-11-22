import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interface/task-interface';
import { Options } from '../interface/options-interface';
import { Store } from '@ngrx/store';
import { tasks } from '../state/tasks/tasks.selector';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  tasks$ = this.store.select(tasks);
  tasks: Task[];
  filteredTasks: Task[];
  currentTaskName = '';
  tasksLeftCount: number;
  options: Options = {filter: 'all'};
  tasksCount: number;

  constructor(private taskService: TaskService, private store: Store<{ tasks: Task[] }>) {
    this.tasks$.subscribe((tasks: Task[]) => {
      this.tasksCount = tasks.length;
      this.tasksLeftCount = tasks.length - tasks.filter(task => task.isCompleted).length;
      this.tasks = tasks;
      this.setFilteredTasks();
    });
  }

  addNewTask(): void {
    if (this.currentTaskName.trim()) {
      this.taskService.addNew(this.currentTaskName);
    }
    this.currentTaskName = '';
  }

  changeOptions(filter: string): void {
    this.options.filter = filter;
    this.setFilteredTasks();
  }

  setFilteredTasks(): void {
    if (this.options.filter === 'all') {
      this.filteredTasks = this.tasks;
    }
    if (this.options.filter === 'todo') {
      this.filteredTasks = this.taskService.getByFilter(false);
    }
    if (this.options.filter === 'completed') {
      this.filteredTasks = this.taskService.getByFilter(true);
    }
  }

  selectAllTasks(): void {
    this.taskService.selectAll();
  }

  clearCompletedTasks(): void {
    this.taskService.deleteCompleted();
    if (this.tasksCount === 0) {
      this.options.filter = 'all';
    }
  }
}
