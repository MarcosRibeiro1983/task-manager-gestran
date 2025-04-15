import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerTableComponent } from './task-manager-table.component';

describe('TaskManagerTableComponent', () => {
  let component: TaskManagerTableComponent;
  let fixture: ComponentFixture<TaskManagerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskManagerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskManagerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
