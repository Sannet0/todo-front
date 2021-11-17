import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { Task } from "../../interface/task-interface";

@Component({
  selector: 'app-task',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService) {}

  tasks: Task[] = [];

  ngOnInit(): void {
    this.tasks = this.taskService.getAll();
  }

}
