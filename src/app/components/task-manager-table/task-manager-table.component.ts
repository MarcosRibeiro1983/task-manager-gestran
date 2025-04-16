
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { MaterialImports } from '../../shared/material.imports';
import { CustomPaginator } from '../custom.paginator';
import { ModalComponent } from "../modal/modal.component";
import { TaskFormComponent } from "../task-form/task-form.component";
import { TASK_STATUS_LIST, TASK_STATUS_LIST_MAP } from '../../models/enum/task.status';
import { SummaryComponent } from "../summary/summary.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task-manager-table',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialImports,
    ModalComponent,
    TaskFormComponent,
    SummaryComponent,
    HttpClientModule
],
  templateUrl: './task-manager-table.component.html',
  styleUrl: './task-manager-table.component.scss',
  providers: [ { provide: MatPaginatorIntl, useClass: CustomPaginator }]
})
export class TaskManagerTableComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Task>();
  tasks: Task[] = [];
  filters$ = new BehaviorSubject<any>({});
  selectedTask?: Task;
  showModal = false;
  displayedColumns: string[] = ['date', 'title', 'status', 'responsible', 'description', 'actions'];
  filterForm!: FormGroup;
  statusLIST = TASK_STATUS_LIST;
  statusMAP = TASK_STATUS_LIST_MAP;
  loading = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchTasks();

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

  fetchTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe(tasks => {
      this.dataSource.data = tasks;
      this.tasks = tasks;
      this.loading = false;
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
      this.fetchTasks();
    });
  }

  saveTask(task: Task) {
    const req = task.id
      ? this.taskService.updateTask(task)
      : this.taskService.createTask(task);

    req.subscribe(() => {
      this.showModal = false;
      this.fetchTasks();
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
