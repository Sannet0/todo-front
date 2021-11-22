import { createReducer, on } from '@ngrx/store';
import {
  addNewTaskAction,
  changeTaskStatusAction,
  deleteCompletedTaskAction,
  deleteTaskAction,
  selectAllTaskAction
} from './tasks.actions';
import { initialState } from './tasks.model';

export const tasksStateKey = 'tasks';

export const tasksReducer = createReducer(
  initialState,
  on(addNewTaskAction, (state, { task }) => {
    const newTasks = [...state.tasks, task];
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(changeTaskStatusAction, (state, {id, isCompleted}) => {
    const newTasks = state.tasks.map((task) => task.id === id ? {...task, isCompleted} : task);
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(deleteTaskAction, (state, {id}) => {
    const newTasks = state.tasks.filter((task) => task.id !== id);
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(selectAllTaskAction, (state) => {
    const newTasks = state.tasks.map((task) => {
      return {...task, isCompleted: true};
    });
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(deleteCompletedTaskAction, (state) => {
    const newTasks = state.tasks.filter((task) => !task.isCompleted);
    return {
      ...state,
      tasks: newTasks
    };
  })
);
