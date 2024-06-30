import { Injectable } from '@angular/core';
import { ITask } from './common.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TaskService {
  constructor() {
    console.log('🚀 ~ TaskService ~ constructor ~ constructor:');
  }

  private tasksList = new BehaviorSubject<ITask[]>([
    {
      id: '1',
      title: 'Complete Project Proposal',
      description:
        'Draft and finalize project proposal document for client review.',
      dueDate: new Date('2024-07-05'),
      priority: 'high',
      taskStatus: 'todo',
    },
    {
      id: '2',
      title: 'Review Code Changes',
      description:
        'Review and provide feedback on recent code changes in the development branch.',
      dueDate: new Date('2024-07-10'),
      priority: 'medium',
      taskStatus: 'todo',
    },
    {
      id: '3',
      title: 'Prepare Presentation Slides',
      description:
        'Create slides for the upcoming team presentation on project milestones.',
      dueDate: new Date('2024-07-15'),
      priority: 'low',
      taskStatus: 'todo',
    },
  ]);

  createNewTask(task: Partial<ITask>): void {
    const taskValue = this.tasksList.getValue();
    taskValue.push(task as ITask);
    this.tasksList.next(taskValue);
  }

  getTaskValue(): Observable<ITask[]> {
    return this.tasksList.asObservable();
  }
}
