import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../interface/task-interface';
import { TaskStateFacadeService } from '../../services/task-state-facade.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task: ITask;

  constructor(private taskService: TaskStateFacadeService) {}

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  onChangeCompletedStatus(id: number, event: Event): void {
    this.taskService.changeStatus(id, (event.target as HTMLInputElement).checked);
  }

}
