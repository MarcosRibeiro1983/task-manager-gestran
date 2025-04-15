import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskManagerTableComponent } from "./components/task-manager-table/task-manager-table.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskManagerTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-manager';
}
