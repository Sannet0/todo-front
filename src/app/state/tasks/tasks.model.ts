import { Task } from '../../interface/task-interface';

export interface ITasksState {
  tasks: Task[];
}

export const initialState: ITasksState = {
  tasks: []
};
