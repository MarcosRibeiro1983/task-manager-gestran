import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, provideNoopAnimations } from '@angular/platform-browser/animations';
import { TaskStatus } from '../../models/enum/task.status';
import { Task } from '../../models/task';
import { MaterialImports } from '../../shared/material.imports';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  const mockTask: Task = {
    id: 1,
    title: 'Planejamento da sprint',
    description: 'Definir metas e tasks da semana',
    responsible: 'John Doe',
    status: TaskStatus.PENDING,
    dueDate: new Date().toISOString()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TaskFormComponent,
        FormsModule,
         ...MaterialImports,
        BrowserAnimationsModule
      ],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values if no task is provided', () => {
    expect(component.form).toBeDefined();
    expect(component.form.value.title).toBe('');
    expect(component.form.valid).toBeFalse();
  });

  it('should populate form when task input is set', () => {
    component.task = mockTask;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.value.title).toBe(mockTask.title);
    expect(component.form.value.responsible).toBe(mockTask.responsible);
  });

  it('should emit cancel when close() is called', () => {
    spyOn(component.cancel, 'emit');
    component.close();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should emit save with form data when form is valid', () => {
    spyOn(component.save, 'emit');

    component.form.setValue({
      title: 'New task test',
      responsible: 'Bob',
      description: 'Adicionando uma task via test do component',
      status: TaskStatus.FINISHED,
      dueDate: new Date().toISOString()
    });

    component.submit();
    expect(component.save.emit).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'New task test',
      responsible: 'Bob'
    }));
  });

  it('should not emit save if form is invalid', () => {
    spyOn(component.save, 'emit');

    component.form.setValue({
      title: '',
      responsible: '',
      description: '',
      status: '',
      dueDate: ''
    });

    component.submit();
    expect(component.save.emit).not.toHaveBeenCalled();
  });
});