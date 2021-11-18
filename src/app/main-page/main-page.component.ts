import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interface/task-interface';
import { Options } from '../interface/options-interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  tasks: Task[] = [];
  currentTaskName = '';
  taskLeftCount: number;
  options: Options = {filter: 'all'};
  tasksCount: number;

  constructor(private taskService: TaskService) {}

  addNewTask(): void {
    if (this.currentTaskName) {
      this.taskService.addNew(this.currentTaskName);
      this.currentTaskName = '';
    }
    this.getTasksWithOptions();
  }

  changeOptions(filter: string): void {
    this.options.filter = filter;
  }

  getTasksWithOptions(): void {
    if (this.options.filter === 'all') {
      this.tasks = this.taskService.tasks;
    }
    if (this.options.filter === 'todo') {
      this.tasks = this.taskService.getByFilter(false);
    }
    if (this.options.filter === 'completed') {
      this.tasks = this.taskService.getByFilter(true);
    }

    this.refreshCounts();
  }

  selectAllTasks(): void {
    this.taskService.selectAll();
    this.getTasksWithOptions();
  }

  refreshCounts(): void {
    this.tasksCount = this.taskService.tasksCount;
    this.taskLeftCount = this.taskService.taskLeft();
  }

  clearCompletedTasks(): void {
    this.taskService.deleteCompleted();
    this.refreshCounts();
    if (this.tasksCount === 0) {
      this.options.filter = 'all';
    }
    this.getTasksWithOptions();
  }

  ngOnInit(): void {
    this.getTasksWithOptions();
  }

}
