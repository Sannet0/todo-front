import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../interface/task-interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task: Task;

  constructor(private taskService: TaskService) {}

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  onChangeCompletedStatus(id: number, event: Event): void {
    this.taskService.changeStatus(id, (event.target as HTMLInputElement).checked);
  }

}
