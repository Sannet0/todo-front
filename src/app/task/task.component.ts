import { Component, OnInit } from '@angular/core';
import { TaskService } from "../services/task.service";
import { Task } from "../intesface/task-interface";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private messageService: TaskService) { }
  tasks: Task[] = [];

  ngOnInit(): void {
    this.tasks = this.messageService.getAll();
  }

}
