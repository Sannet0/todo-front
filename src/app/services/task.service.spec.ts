import { TestBed } from '@angular/core/testing';

import { TaskStateFacadeService } from './task-state-facade.service';

describe('TaskService', () => {
  let service: TaskStateFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStateFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
