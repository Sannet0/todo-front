import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../interface/task-interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent{
  @Input() task: Task;
  @Output() changeTask = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  onDeleteTask(id: string): void {
    this.taskService.deleteTask(id);
    this.changeTask.emit();
  }

  onChangeCompletedStatus(id: string, event: Event): void {
    this.taskService.changeCompletedStatus(id, (event.target as HTMLInputElement).checked);
    this.changeTask.emit();
  }

}
