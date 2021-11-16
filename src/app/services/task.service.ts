import { Injectable } from '@angular/core';
import { Task } from "../interface/task-interface";

const tasks = [
  {
    text: 'first task-tile',
    isCompleted: false
  },
  {
    text: 'second task-tile',
    isCompleted: true
  }
]

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];

  getAll(): Task[]  {
    this.tasks = [...tasks];
    return this.tasks;
  }
}
