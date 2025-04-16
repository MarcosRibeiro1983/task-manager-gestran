import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskStatus } from '../../models/enum/task.status';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnInit {

  @Input()
  tasks: Task[] = [];
  
  totalPending = 0;
  total = 0;
  totalInDev = 0;
  totalFinished = 0;

  constructor() {

   
  }
  ngOnInit(): void {
    this.total = this.tasks.length;
    this.totalPending = this.tasks.filter(t => t.status === TaskStatus.PENDING).length;
    this.totalInDev = this.tasks.filter(t => t.status === TaskStatus.IN_DEVELOPMENT).length;
    this.totalFinished = this.tasks.filter(t => t.status === TaskStatus.FINISHED).length;
  }

}
