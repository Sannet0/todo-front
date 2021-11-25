import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './tasks.actions';
import { map, mergeMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasks),
    mergeMap(() =>
      this.apiService.getAllTasks().pipe(
        map(tasks => TaskActions.loadTasksSuccess({ tasks }))
      ))
  ));

  newTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.addTask),
    mergeMap(({ text }) => this.apiService.addNewTask(text).pipe(
        map(task => TaskActions.addTaskSuccess({ task }))
      )
    )
  ));

  changeTaskStatus$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.changeTaskStatus),
    mergeMap(({ id, isCompleted }) => this.apiService.changeTaskStatus(id, isCompleted).pipe(
        map(() => TaskActions.changeTaskStatusSuccess({ id, isCompleted }))
      )
    )
  ));

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.deleteTask),
    mergeMap(({ id }) => this.apiService.deleteTask(id).pipe(
        map(() => TaskActions.deleteTaskSuccess({ id }))
      )
    )
  ));

  deleteCompleteTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.deleteCompletedTask),
    mergeMap(() => this.apiService.deleteCompleteTasks().pipe(
        map(() => TaskActions.deleteCompletedTaskSuccess())
      )
    )
  ));

  completeAllTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.selectAllTask),
    mergeMap(() => this.apiService.completeAllTasks().pipe(
        map(() => TaskActions.selectAllTaskSuccess())
      )
    )
  ));
}
