import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export default class TaskListComponent {
  tasks = [
    {
      title: 'Complete Project Proposal',
      description:
        'Draft and finalize project proposal document for client review.',
      dueDate: new Date('2024-07-05'),
      priority: 'high',
    },
    {
      title: 'Review Code Changes',
      description:
        'Review and provide feedback on recent code changes in the development branch.',
      dueDate: new Date('2024-07-10'),
      priority: 'medium',
    },
    {
      title: 'Prepare Presentation Slides',
      description:
        'Create slides for the upcoming team presentation on project milestones.',
      dueDate: new Date('2024-07-15'),
      priority: 'low',
    },
  ];
}
