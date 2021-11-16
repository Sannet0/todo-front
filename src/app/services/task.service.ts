import { Injectable } from '@angular/core';
import { Task } from "../intesface/task-interface";

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

const tasks = [
  {
    text: 'first task',
    isCompleted: false
  },
  {
    text: 'second task',
    isCompleted: true
  }
]
