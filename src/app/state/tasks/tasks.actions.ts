import { createAction, props } from '@ngrx/store';
import { Task } from '../../interface/task-interface';

export const setOriginTasksTaskAction = createAction(
  '[Tasks] Set origin tasks',
  props<{ tasks: Task[] }>()
);
export const addNewTaskAction = createAction(
  '[Tasks] Add new task',
  props<{ task: Task }>()
);
export const changeTaskStatusAction = createAction(
  '[Tasks] Change task status',
  props<{ id: number; isComplete: boolean }>()
);
export const deleteTaskAction = createAction(
  '[Tasks] Delete task',
  props<{ id: number }>()
);
export const selectAllTaskAction = createAction(
  '[Tasks] Select all task'
);
export const deleteCompletedTaskAction = createAction(
  '[Tasks] Delete all completed task'
);
