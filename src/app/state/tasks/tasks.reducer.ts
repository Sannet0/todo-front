import { createReducer, on } from '@ngrx/store';
import {
  addNewTaskAction,
  changeTaskStatusAction,
  deleteCompletedTaskAction,
  deleteTaskAction,
  selectAllTaskAction, setOriginTasksTaskAction
} from './tasks.actions';
import { initialState } from './tasks.model';

export const tasksStateKey = 'tasks';

export const tasksReducer = createReducer(
  initialState,
  on(setOriginTasksTaskAction, (state, {tasks}) => {
    return {
      ...state,
      tasks
    };
  }),
  on(addNewTaskAction, (state, {task}) => {
    const newTasks = [...state.tasks, task];
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(changeTaskStatusAction, (state, {id, isComplete}) => {
    const newTasks = state.tasks.map((task) => task.id === id ? {...task, isComplete} : task);
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
      return {...task, isComplete: true};
    });
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(deleteCompletedTaskAction, (state) => {
    const newTasks = state.tasks.filter((task) => !task.isComplete);
    return {
      ...state,
      tasks: newTasks
    };
  })
);
