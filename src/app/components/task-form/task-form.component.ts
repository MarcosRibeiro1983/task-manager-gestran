import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  @Input() task?: Task;
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.task?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [this.task?.description || ''],
      status: [this.task?.status || 'pendente', Validators.required],
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
