import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskManagerListComponent } from "./pages/task-manager-list/task-manager-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskManagerListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-manager';
}
