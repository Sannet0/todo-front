import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpService) { }

  getAllTasks(): Observable<any> {
    return this.httpService.get('tasks');
  }

  addNewTask(text: string): Observable<any> {
    return this.httpService.post('task', { text });
  }

  deleteTask(id: number): Observable<any> {
    return this.httpService.delete(`task/${id}`);
  }

  changeTaskStatus(id: number, isComplete: boolean): Observable<any> {
    return this.httpService.patch(`task/${id}`, { isComplete });
  }

  completeAllTasks(): Observable<any> {
    return this.httpService.patch(`tasks/all`);
  }

  deleteCompleteTasks(): Observable<any> {
    return this.httpService.delete('tasks/complete');
  }
}
