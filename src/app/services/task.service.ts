import { Injectable } from '@angular/core';
import { Task } from '../interface/task-interface';

const tasks = [
  {
    id: 0,
    text: 'First task',
    isCompleted: false
  },
  {
    id: 1,
    text: 'Second task',
    isCompleted: true
  },
  {
    id: 2,
    text: 'Task',
    isCompleted: true
  },
  {
    id: 3,
    text: 'Hello',
    isCompleted: false
  },
  {
    id: 4,
    text: 'Kitty',
    isCompleted: false
  },
  {
    id: 5,
    text: 'olololo',
    isCompleted: false
  },
  {
    id: 6,
    text: 'olololo',
    isCompleted: false
  },
  {
    id: 7,
    text: 'olololo',
    isCompleted: false
  },
]

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];
  tasksCount: number;

  getAll(): Task[] {
    this.tasks = [...tasks];
    this.tasksCount = this.tasks.length;
    return this.tasks;
  }

  addNew(text: string): void {
    const id = this.tasks.length;
    this.tasks.push({
      id,
      text,
      isCompleted: false
    });
    this.tasksCount = this.tasks.length;
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
