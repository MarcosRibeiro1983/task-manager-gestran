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

describe('TaskService com JSON Server (mock)', () => {
    let service: TaskService;
    let httpMock: HttpTestingController;
    const mockUrl = 'http://localhost:3000/tasks';
  
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
  
    it('deve buscar tarefas do JSON Server simulado', () => {
      service.getTasks().subscribe(tasks => {
        expect(tasks.length).toBe(2);
        expect(tasks).toEqual(mockTasks);
      });
  
      const req = httpMock.expectOne(mockUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });
  });