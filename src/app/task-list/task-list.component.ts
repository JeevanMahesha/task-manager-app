import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ITask } from '../common.model';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { GetValuePipe } from '../Pipes/get-value.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    GetValuePipe,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export default class TaskListComponent {
  readonly dialog = inject(MatDialog);
  readonly taskService = inject(TaskService);
  tasks: Observable<ITask[]> = this.taskService.getTaskValue();

  constructor() {
    // this.createTask();
  }

  createTask(): void {
    this.dialog.open(CreateTaskComponent, {
      data: 'Hello',
      width: '500px',
      disableClose: true,
    });
  }

  editTask(task: ITask): void {
    console.log('🚀 ~ TaskListComponent ~ editTask ~ ̵task:', task);
  }

  deleteTask(task: ITask): void {
    console.log('🚀 ~ TaskListComponent ~ deleteTask ~ task:', task);
  }
}
