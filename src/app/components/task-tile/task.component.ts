import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { Task } from "../../interface/task-interface";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService) { }
  tasks: Task[] = [];

  ngOnInit(): void {
    this.tasks = this.taskService.getAll();
  }

}
