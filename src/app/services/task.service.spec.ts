import { TestBed } from '@angular/core/testing';

import { TaskStateFacadeService } from './task-state-facade.service';
import * as TaskActions from '../state/tasks/tasks.actions';
import { Store, StoreModule } from '@ngrx/store';
import { ITask } from '../interface/task-interface';
import { HttpClientModule } from '@angular/common/http';
import { reducers } from '../state/state.model';
import { deleteCompletedTaskSuccess } from '../state/tasks/tasks.actions';

describe('TaskStateFacadeService', () => {
  let service: TaskStateFacadeService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(reducers)
      ]
    });
    service = TestBed.inject(TaskStateFacadeService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set tasks in store and write it in tasks service', () => {
    let storeTasks: ITask[] = [];
    const tasks: ITask[] = [
      {
        id: 1,
        text: 'First Task',
        isCompleted: true,
        createdAt: 'date',
        updatedAt: 'date'
      }
    ];
    const task: ITask = {
      id: 2,
      text: 'Second Task',
      isCompleted: true,
      createdAt: 'date',
      updatedAt: 'date'
    };
    const tasksExceptions: ITask[] = [
      {
        id: 1,
        text: 'First Task',
        isCompleted: true,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 2,
        text: 'Second Task',
        isCompleted: true,
        createdAt: 'date',
        updatedAt: 'date'
      }
    ];

    service.tasks$.subscribe(tasks => storeTasks = tasks);
    store.dispatch(TaskActions.loadTasksSuccess({ tasks }));

    store.dispatch(TaskActions.addTaskSuccess({task}));

    expect(storeTasks).toEqual(tasksExceptions);
  });

  it('should load accurate task', () => {
    let storeTasks: ITask[] = [];
    const tasks: ITask[] = [
      {
        id: 1,
        text: 'First Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 2,
        text: 'Second Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      }
    ];
    const tasksExceptions: ITask[] = [
      {
        id: 1,
        text: 'First Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 2,
        text: 'Second Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      }
    ];

    service.tasks$.subscribe(tasks => storeTasks = tasks);
    store.dispatch(TaskActions.loadTasksSuccess({ tasks }));

    expect(storeTasks).toEqual(tasksExceptions);
  });

  it('should select task as complete', () => {
    let storeTasks: ITask[] = [];
    const tasks: ITask[] = [
      {
        id: 1,
        text: 'First Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 2,
        text: 'Second Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      }
    ];
    const tasksExceptions: ITask[] = [
      {
        id: 1,
        text: 'First Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 2,
        text: 'Second Task',
        isCompleted: true,
        createdAt: 'date',
        updatedAt: 'date'
      }
    ];
    const idSelectTask = 2;

    service.tasks$.subscribe(tasks => storeTasks = tasks);
    store.dispatch(TaskActions.loadTasksSuccess({ tasks }));

    store.dispatch(TaskActions.changeTaskStatusSuccess({ id: idSelectTask, isCompleted: true}));

    expect(storeTasks).toEqual(tasksExceptions);
  });


  it('should delete task by id from store', () => {
    let storeTasks: ITask[] = [];
    const tasks: ITask[] = [
      {
        id: 1,
        text: 'First Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 2,
        text: 'Second Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      }
    ];
    const tasksExceptions: ITask[] = [
      {
        id: 1,
        text: 'First Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      }
    ];
    const idDeletedTask = 2;

    service.tasks$.subscribe(tasks => storeTasks = tasks);
    store.dispatch(TaskActions.loadTasksSuccess({ tasks }));
    store.dispatch(TaskActions.deleteTaskSuccess({ id: idDeletedTask}));

    expect(storeTasks).toEqual(tasksExceptions);
  });

  it('should select all task as complete', () => {
    let storeTasks: ITask[] = [];
    const tasks: ITask[] = [
      {
        id: 1,
        text: 'First Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 2,
        text: 'Second Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 3,
        text: 'Third Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 4,
        text: 'Fourth Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      }
    ];
    const tasksExceptions: ITask[] = [
      {
        id: 1,
        text: 'First Task',
        isCompleted: true,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 2,
        text: 'Second Task',
        isCompleted: true,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 3,
        text: 'Third Task',
        isCompleted: true,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 4,
        text: 'Fourth Task',
        isCompleted: true,
        createdAt: 'date',
        updatedAt: 'date'
      }
    ];

    service.tasks$.subscribe(tasks => storeTasks = tasks);
    store.dispatch(TaskActions.loadTasksSuccess({ tasks }));

    store.dispatch(TaskActions.selectAllTaskSuccess());

    expect(storeTasks).toEqual(tasksExceptions);
  });

  it('should delete all complete tasks', () => {
    let storeTasks: ITask[] = [];
    const tasks: ITask[] = [
      {
        id: 1,
        text: 'First Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 2,
        text: 'Second Task',
        isCompleted: true,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 3,
        text: 'Third Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 4,
        text: 'Fourth Task',
        isCompleted: true,
        createdAt: 'date',
        updatedAt: 'date'
      }
    ];

    const tasksExceptions: ITask[] = [
      {
        id: 1,
        text: 'First Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      },
      {
        id: 3,
        text: 'Third Task',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date'
      }
    ];

    service.tasks$.subscribe(tasks => storeTasks = tasks);
    store.dispatch(TaskActions.loadTasksSuccess({ tasks }));

    store.dispatch(TaskActions.deleteCompletedTaskSuccess());

    expect(storeTasks).toEqual(tasksExceptions);
  });


});
