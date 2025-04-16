import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TaskManagerTableComponent } from './task-manager-table.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule, provideNoopAnimations } from '@angular/platform-browser/animations';
import { Task } from '../../models/task';
import { Component, Input, Output, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TaskStatus } from '../../models/enum/task.status';
import { MaterialImports } from '../../shared/material.imports';

@Component({ selector: 'app-summary', template: '' })
class SummaryFakeComponent {
  @Input() tasks: Task[] = [];
}
@Component({ selector: 'app-modal', template: '<ng-content></ng-content>' })
class ModalFakeComponent {
  @Output() close = new EventEmitter<void>();
}
@Component({ selector: 'app-task-form', template: '' })
class TaskFormFakeComponent {
  @Input() task?: Task;
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();
}



describe('TaskManagerTableComponent', () => {
  let component: TaskManagerTableComponent;
  let fixture: ComponentFixture<TaskManagerTableComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

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

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTasks', 'deleteTask', 'updateTask', 'createTask']);
    mockTaskService.getTasks.and.returnValue(of(mockTasks));

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        ...MaterialImports,
        BrowserAnimationsModule
      ],
      declarations: [
        TaskManagerTableComponent,
        SummaryFakeComponent,
        ModalFakeComponent,
        TaskFormFakeComponent
      ],
      providers: [{ provide: TaskService, useValue: mockTaskService }, provideNoopAnimations()],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(TaskManagerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tasks on init and render table rows', () => {
    const rows = fixture.debugElement.queryAll(By.css('table mat-row'));
    expect(component.tasks.length).toBe(2);
    expect(rows.length).toBe(2);
  });

  it('should display loading spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.spinner-chart'));
    expect(spinner).toBeTruthy();

    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeNull();
  });

  it('should apply filter by responsible name', fakeAsync(() => {
    component.filterForm.controls['responsible'].setValue('bob');
    tick(300);
    fixture.detectChanges();

    const filtered = component.dataSource.filteredData;
    expect(filtered.length).toBe(1);
    expect(filtered[0].responsible.toLowerCase()).toContain('bob');
  }));

  it('should call createTask and show modal', () => {
    component.createTask();
    expect(component.selectedTask).toBeUndefined();
    expect(component.showModal).toBeTrue();
  });

  it('should call updateTask and show modal with selected task', () => {
    const task = mockTasks[0];
    component.updateTask(task);
    expect(component.selectedTask).toEqual(task);
    expect(component.showModal).toBeTrue();
  });

  it('should call deleteTask and refresh tasks', () => {
    mockTaskService.deleteTask.and.returnValue(of());
    component.deleteTask(1);
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(1);
    expect(mockTaskService.getTasks).toHaveBeenCalledTimes(2);
  });
});
