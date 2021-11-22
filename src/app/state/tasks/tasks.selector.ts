import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITasksState } from './tasks.model';

export const state = createFeatureSelector<ITasksState>('tasks');

export const tasks = createSelector(state, (state) => state.tasks);
