
import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  MatIconModule } from '@angular/material/icon'
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule  } from '@angular/material/paginator'
import { Subscription } from 'rxjs';
//import { CustomPaginator } from './custom-paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-task-manager-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatTooltipModule],
  templateUrl: './task-manager-table.component.html',
  styleUrl: './task-manager-table.component.scss'
})
export class TaskManagerTableComponent implements AfterViewInit, OnChanges, OnDestroy{


  @Input()
  tasks: any[] = [];
  dataSource!: MatTableDataSource<any>; 

  @ViewChild(MatPaginator) pagination!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  private dialogManagerSubscriptions?: Subscription; 

  @Output()
  confirmDelete = new EventEmitter<any>();

  @Output()
  update = new EventEmitter<any>();

  constructor(
  ) {}
  
  ngOnDestroy(): void {
    if(this.dialogManagerSubscriptions) {
      this.dialogManagerSubscriptions.unsubscribe();
    }
  }
  ngOnChanges(changes: any): void {
    if(changes['tasks'] && this.tasks) {
      this.dataSource = new MatTableDataSource<any>(this.tasks)
      if(this.pagination) {
        this.dataSource.paginator = this.pagination;
      }
    }
  }

  ngAfterViewInit(): void {
   this.dataSource.paginator = this.pagination;
  }

  updateTask(task: any) {
    this.update.emit(task);
  }

  deleteTask(client: any) {
  //  this.dialog.showYesNoDialog(YesNoDialogComponent, {
  //   title: 'Exclusão de cliente', 
  //   content: `Tem certeza que deseja excluir o cliente ${client.name} ?`})
  //   .subscribe( result => {
  //     if(result) {
  //       this.confirmDelete.emit(client);
  //       const updateList = this.dataSource.data.filter( c => c.id != client.id );
  //       this.dataSource = new MatTableDataSource<ClientModel>(updateList);
  //     }
  //   })
  }

  formatPhone(phone: string) {
    return `( ${phone.substring(0, 2)} ) ${phone.substring(2, 7)} - ${phone.substring(7)} `
  }


}
