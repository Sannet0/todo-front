import { Component, OnInit } from '@angular/core';
import { TaskService } from "../services/task.service";
import { Task } from "../interface/task-interface";

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getAll();
  }

}
