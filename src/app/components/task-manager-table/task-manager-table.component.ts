
import { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter,OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  MatIconModule } from '@angular/material/icon'
import { MatPaginator, MatPaginatorModule  } from '@angular/material/paginator'
import { BehaviorSubject, debounceTime, Subscription, switchMap } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-manager-table',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatTooltipModule],
  templateUrl: './task-manager-table.component.html',
  styleUrl: './task-manager-table.component.scss'
})
export class TaskManagerTableComponent implements OnInit {

  tasks: Task[] = [];
  dataSource!: MatTableDataSource<any>; 
  filters$ = new BehaviorSubject<any>({});
  selectedTask?: Task;
  showModal = false;

  @ViewChild(MatPaginator) pagination!: MatPaginator;

  displayedColumns: string[] = ['date', 'title', 'status', 'description', 'actions'];

  @Output()
  confirmDelete = new EventEmitter<any>();

  @Output()
  update = new EventEmitter<any>();
  
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.filters$.pipe(
      debounceTime(300),
      switchMap(filters => this.taskService.getTasks(filters))
    ).subscribe(tasks => this.tasks = tasks);
  }
  
  
  applyFilter(filter: any) {
    this.filters$.next(filter);
  }

  updateTask(task: Task) {
    this.selectedTask = task;
    this.showModal = true;
  }

  newTask() {
    this.selectedTask = undefined;
    this.showModal = true;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.filters$.next(this.filters$.value); // reload
    });
  }

  saveTask(task: Task) {
    const action = task.id ? this.taskService.updateTask(task) : this.taskService.createTask(task);
    action.subscribe(() => {
      this.showModal = false;
      this.filters$.next(this.filters$.value); // reload
    });
  }
  
  closeModal() {
    this.showModal = false;
  }
}
