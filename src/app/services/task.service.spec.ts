import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task';
import { TaskStatus } from '../models/enum/task.status';

const mockTasks: Task[] = [
    {
        id: 1,
        title: "Planejamento da sprint",
        description: "Definir metas e tasks da semana",
        status: TaskStatus.PENDING,
        responsible: "John Doe",
        dueDate: "2025-04-18"
      },
      {
        id: 2,
        title: "Revisar PR #GESTRAN-85",
        description: "Verificar mudanças do pull request",
        status: TaskStatus.IN_DEVELOPMENT,
        responsible: "Mary Jane",
        dueDate: "2025-04-20"
      },
];

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve carregar as tarefas do arquivo mock', () => {
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('public/mock-data/db.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });
});