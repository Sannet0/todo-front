import { Injectable } from '@angular/core';
import { Task } from '../interface/task-interface';

const tasks = [
  {
    id: 0,
    text: 'first task',
    isCompleted: false
  },
  {
    id: 1,
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

  addNew(text: string): void {
    const id = this.tasks.length;
    this.tasks.push({
      id,
      text,
      isCompleted: false
    });
  }

  changeCompletedStatus(id: number, isCompleted: boolean): void {
    this.tasks.forEach((task: Task) => {
      if (task.id === id) {
        task.isCompleted = isCompleted;
      }
    });
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.reduce((data: Task[], task: Task) => {
      if (task.id !== id) {
        data.push(task);
      }

      return data;
    }, []);
  }

  selectAll() {
    this.tasks.forEach((task: Task) => {
      task.isCompleted = true;
    });
  }

  deleteCompleted() {
    this.tasks = [...this.tasks].reduce((data: Task[], task: Task) => {
      if (!task.isCompleted) {
        data.push(task);
      }

      return data;
    }, []);
  }

  getByFilter(isCompleted: boolean): Task[] {
    return [...this.tasks].reduce((data: Task[], task: Task) => {
      if (task.isCompleted === isCompleted) {
        data.push(task);
      }

      return data;
    }, []);
  }

  taskLeft(): number {
    return this.tasks.reduce((count: number, task: Task) => {
      if (!task.isCompleted) {
        count++;
      }
      return count;
    }, 0);
  }
}
