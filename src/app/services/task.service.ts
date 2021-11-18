import { Injectable } from '@angular/core';
import { Task } from '../interface/task-interface';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [];
  tasksCount: number = 0;

  addNew(text: string): void {
    this.tasks.push({
      id: uuidv4(),
      text,
      isCompleted: false
    });
    this.tasksCount = this.tasks.length;
  }

  changeCompletedStatus(id: string, isCompleted: boolean): void {
    this.tasks.forEach((task: Task) => {
      if (task.id === id) {
        task.isCompleted = isCompleted;
      }
    });
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.reduce((data: Task[], task: Task) => {
      if (task.id !== id) {
        data.push(task);
      }

      return data;
    }, []);
    this.tasksCount = this.tasks.length;
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
    this.tasksCount = this.tasks.length;
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
