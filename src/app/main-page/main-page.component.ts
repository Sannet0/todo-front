import { Component, OnInit } from '@angular/core';
import { FilterType, TaskStateFacadeService } from '../services/task-state-facade.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  filterType = FilterType;
  currentTaskName = '';
  taskCount$ = this.taskService.taskCount$;
  tasksLeftCount$ = this.taskService.tasksLeftCount$;
  filteredTasks$ = this.taskService.filteredTasks$;
  constructor(private taskService: TaskStateFacadeService) {
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

  changeOptions(type: FilterType): void {
    this.taskService.setFilterType(type);
  }


  selectAllTasks(): void {
    this.taskService.selectAll();
  }

  clearCompletedTasks(): void {
    this.taskService.setFilterType(FilterType.all);
    this.taskService.deleteCompleted();
  }
}
