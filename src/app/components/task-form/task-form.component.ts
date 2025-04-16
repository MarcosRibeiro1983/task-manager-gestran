import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task';
import { MaterialImports } from '../../shared/material.imports';
import { TASK_STATUS_LIST, TaskStatus } from '../../models/enum/task.status';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ...MaterialImports
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {

  @Input() task?: Task;
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  statusLIST = TASK_STATUS_LIST;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.task?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [this.task?.description || ''],
      status: [this.task?.status || TaskStatus.PENDING, Validators.required],
      responsible: [this.task?.responsible || '', Validators.required],
      dueDate: [this.task?.dueDate || '', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const formValue: Task = {
        ...this.task,
        ...this.form.value
      };
      this.save.emit(formValue);
    }
  }

  close() {
    this.cancel.emit();
  }

}
