import { Component } from '@angular/core';
import { TaskManagerTableComponent } from "../../components/task-manager-table/task-manager-table.component";

@Component({
  selector: 'app-task-manager-list',
  imports: [TaskManagerTableComponent],
  templateUrl: './task-manager-list.component.html',
  styleUrl: './task-manager-list.component.scss'
})
export class TaskManagerListComponent {

}
