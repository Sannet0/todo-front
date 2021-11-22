import { ActionReducerMap } from '@ngrx/store';
import { tasksReducer, tasksStateKey } from './tasks/tasks.reducer';
import { ITasksState } from './tasks/tasks.model';

export interface IState {
  [tasksStateKey]: ITasksState;
}

export const reducers: ActionReducerMap<IState> = {
  tasks: tasksReducer
};
