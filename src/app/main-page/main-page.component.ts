import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interface/task-interface';
import { Options } from "../interface/options-interface";
import { trigger } from "@angular/animations";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  tasks: Task[] = [];
  taskLeftCount: number;
  options: Options = {filter: 'all'}

  constructor(private taskService: TaskService) {
  }

  addNewTask(event: Event): void {
    const inputText = (event.target as HTMLInputElement).value;

    if (inputText) {
      (event.target as HTMLInputElement).value = '';
      this.taskService.addNew(inputText);
    }

    this.refreshTasks();
  }

  getAllTasks(): void {
    this.tasks = this.taskService.tasks;
  }

  changeOptions(filter: string): void {
    this.options.filter = filter;
  }

  getTasksWithOptions(): void {
    if (this.options.filter === 'all') {
      this.getAllTasks();
    }
    if (this.options.filter === 'todo') {
      this.tasks = this.taskService.getByFilter(false);
    }
    if (this.options.filter === 'completed') {
      this.tasks = this.taskService.getByFilter(true);
    }
  }

  selectAllTasks(): void {
    this.taskService.selectAll();
    this.refreshTasks();
  }

  refreshTasks(): void {
    this.getAllTasks();
    this.taskLeftCount = this.taskService.taskLeft();
  }

  clearCompletedTasks(): void {
    this.taskService.deleteCompleted();
    this.refreshTasks();
  }

  ngOnInit(): void {
    this.taskService.getAll();
    this.refreshTasks();
  }

}
