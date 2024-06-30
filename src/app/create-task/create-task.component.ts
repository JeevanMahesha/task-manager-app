import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ITaskFrom } from './create-task.forms';
import { TaskService } from '../task.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { priorityLevels, taskStatus } from '../common.model';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  readonly dialogRef = inject(MatDialogRef<CreateTaskComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly taskService = inject(TaskService);
  taskForm: FormGroup<ITaskFrom>;
  priorityLevels = priorityLevels;
  taskStatus = taskStatus;

  constructor() {
    const fb = inject(FormBuilder);
    this.taskForm = fb.group({
      id: fb.control<string | null>(crypto.randomUUID(), Validators.required),
      title: fb.control<string | null>(null, Validators.required),
      description: fb.control<string | null>(null, Validators.required),
      priority: fb.control<string | null>(null, Validators.required),
      taskStatus: fb.control<string | null>(null, Validators.required),
      dueDate: fb.control<Date | null>(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.createNewTask(this.taskForm.value);
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
