import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, from, mergeMap } from 'rxjs';
import { ITask } from './common.model';

@Injectable()
export class TaskService {
  private tasksList$ = new BehaviorSubject<ITask[]>([
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
    const taskValue = this.tasksList$.getValue();
    taskValue.push(task as ITask);
    this.tasksList$.next(taskValue);
  }

  updateTask(task: Partial<ITask>): void {
    const taskValue = this.tasksList$.getValue();
    const taskIndex = taskValue.findIndex(
      (eachTask) => eachTask.id === task.id
    );
    if (taskIndex > -1) {
      taskValue[taskIndex] = task as ITask;
      this.tasksList$.next([...taskValue]);
    }
  }

  getTaskValue(): Observable<ITask[]> {
    return this.tasksList$.asObservable();
  }

  getSpecificTask(taskId: string): Observable<ITask> {
    return this.getTaskValue().pipe(
      mergeMap(from),
      filter((task) => task.id === taskId)
    );
  }

  deleteTask(taskId: string): void {
    const taskValue = this.tasksList$.getValue();
    const taskIndex = taskValue.findIndex((eachTask) => eachTask.id === taskId);
    if (taskIndex > -1) {
      taskValue.splice(taskIndex, 1);
      this.tasksList$.next([...taskValue]);
    }
  }

  getTaskRawValue(): ITask[] {
    return this.tasksList$.getValue();
  }

  updateTaskStatus(taskId: string, taskStatus: string): void {
    const taskValue = this.tasksList$.getValue();
    const taskIndex = taskValue.findIndex((eachTask) => eachTask.id === taskId);
    if (taskIndex > -1) {
      taskValue[taskIndex].taskStatus = taskStatus;
      this.tasksList$.next([...taskValue]);
    }
  }
}
