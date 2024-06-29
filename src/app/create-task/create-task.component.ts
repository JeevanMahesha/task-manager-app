import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  readonly dialogRef = inject(MatDialogRef<CreateTaskComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
}
