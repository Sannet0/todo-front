import { Injectable } from '@angular/core';
import { Task } from "../interface/task-interface";

const tasks = [
  {
    id: '1',
    text: 'first task',
    isCompleted: false
  },
  {
    id: '2',
    text: 'second task',
    isCompleted: true
  }
]

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];

  getAll(): Task[] {
    this.tasks = [...tasks];
    return this.tasks;
  }
}
