import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ITask } from '../common.model';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export default class TaskListComponent {
  readonly dialog = inject(MatDialog);
  readonly taskService = inject(TaskService);
  tasks: Observable<ITask[]> = this.taskService.getTaskValue();

  constructor() {}

  createTask(): void {
    this.dialog.open(CreateTaskComponent, {
      data: 'Hello',
      width: '500px',
      disableClose: true,
    });
  }
}
