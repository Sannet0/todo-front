import { Component, Input, OnInit } from '@angular/core';
import { Task } from "../../interface/task-interface";
import { TaskService } from "../../services/task.service";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;

  constructor(private taskService: TaskService) {}

  onDeleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  onChangeCompletedStatus(id: string) {
    const isCompleted = this.task?.isCompleted || false;
    this.taskService.changeCompletedStatus(id, isCompleted);
  }

  ngOnInit(): void {

  }

}
