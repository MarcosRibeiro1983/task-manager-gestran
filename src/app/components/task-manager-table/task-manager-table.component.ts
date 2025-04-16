
import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, Component, EventEmitter,OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  MatIconModule } from '@angular/material/icon'
import { MatPaginator, MatPaginatorModule  } from '@angular/material/paginator'
import { BehaviorSubject, debounceTime, Subscription, switchMap } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../modal/modal.component";
import { TaskFormComponent } from "../task-form/task-form.component";
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-task-manager-table',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    MatTableModule, 
    MatIconModule, 
    MatButtonModule, 
    MatPaginatorModule, 
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ModalComponent, 
    TaskFormComponent],
  templateUrl: './task-manager-table.component.html',
  styleUrl: './task-manager-table.component.scss'
})
export class TaskManagerTableComponent implements OnInit, AfterViewInit {

  tasks: Task[] = [];
  dataSource = new MatTableDataSource<Task>();
  filters$ = new BehaviorSubject<any>({});
  selectedTask?: Task;
  showModal = false;
  displayedColumns: string[] = ['date', 'title', 'status', 'responsible', 'description', 'actions'];
  filterForm!: FormGroup;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadTasks();

    this.filterForm = this.fb.group({
      status: [''],
      responsible: ['']
    });

    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(filters => {
        this.applyFilter(filters);
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.dataSource.data = tasks;
    });
  }

  applyFilter(filters: any) {
    this.dataSource.filterPredicate = (data: Task, filter: string) => {
      const parsed = JSON.parse(filter);
      const matchStatus = parsed.status ? data.status === parsed.status : true;
      const matchResponsible = parsed.responsible
        ? data.responsible.toLowerCase().includes(parsed.responsible.toLowerCase())
        : true;
      return matchStatus && matchResponsible;
    };

    this.dataSource.filter = JSON.stringify(filters);
  }

  updateTask(task: Task) {
    this.selectedTask = task;
    this.showModal = true;
  }

  createTask() {
    this.selectedTask = undefined;
    this.showModal = true;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  saveTask(task: Task) {
    const req = task.id
      ? this.taskService.updateTask(task)
      : this.taskService.createTask(task);

    req.subscribe(() => {
      this.showModal = false;
      this.loadTasks();
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
