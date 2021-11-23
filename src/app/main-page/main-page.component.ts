import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interface/task-interface';
import { IOption } from '../interface/option-interface';
import { Store } from '@ngrx/store';
import { tasks } from '../state/tasks/tasks.selector';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  tasks$ = this.store.select(tasks);
  tasks: Task[];
  filteredTasks: Task[];
  currentTaskName = '';
  tasksLeftCount: number;
  option: IOption = {filter: 'all'};
  tasksCount: number;

  constructor(private taskService: TaskService, private store: Store<{ tasks: Task[] }>) {
    this.tasks$.subscribe((tasks: Task[]) => {
      this.tasksCount = tasks.length;
      if (this.tasksCount === 0) {
        this.option.filter = 'all';
      }
      this.tasksLeftCount = tasks.length - tasks.filter(task => task.isComplete).length;
      this.tasks = tasks;
      this.setFilteredTasks();
    });
  }

  ngOnInit(): void {
    this.taskService.getAll();
  }

  addNewTask(): void {
    if (this.currentTaskName.trim()) {
      this.taskService.addNew(this.currentTaskName);
    }
    this.currentTaskName = '';
  }

  changeOptions(filter: string): void {
    this.option.filter = filter;
    this.setFilteredTasks();
  }

  setFilteredTasks(): void {
    if (this.option.filter === 'all') {
      this.filteredTasks = this.tasks;
    }
    if (this.option.filter === 'todo') {
      this.filteredTasks = this.taskService.getByFilter(false);
    }
    if (this.option.filter === 'completed') {
      this.filteredTasks = this.taskService.getByFilter(true);
    }
  }

  selectAllTasks(): void {
    this.taskService.selectAll();
  }

  clearCompletedTasks(): void {
    this.taskService.deleteCompleted();
  }
}
