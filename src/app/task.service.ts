import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  filter,
  from,
  mergeMap,
  of,
  throwError,
} from 'rxjs';
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
  private insertionCount = 0;

  createNewTask(task: Partial<ITask>): Observable<string> {
    try {
      if (this.insertionCount > 0) {
        this.insertionCount = 0;
        throw new Error('Manually triggered error');
      }
      this.insertionCount++;
      const taskValue = this.tasksList$.getValue();
      taskValue.push(task as ITask);
      this.tasksList$.next(taskValue);
      return this.getReturnMessage('Task Created Successfully', 'Success');
    } catch (error) {
      return this.getReturnMessage('Task Creation Failed', 'Error');
    }
  }

  updateTask(task: Partial<ITask>): Observable<string> {
    try {
      const taskValue = this.tasksList$.getValue();
      const taskIndex = taskValue.findIndex(
        (eachTask) => eachTask.id === task.id
      );
      if (taskIndex > -1) {
        taskValue[taskIndex] = task as ITask;
        this.tasksList$.next([...taskValue]);
      }
      return this.getReturnMessage('Task Updated Successfully', 'Success');
    } catch (error) {
      return this.getReturnMessage('Task Update Failed', 'Error');
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

  private getReturnMessage(
    messageValue: string,
    status: 'Success' | 'Error'
  ): Observable<string> {
    return status === 'Success'
      ? of(messageValue)
      : throwError(() => new Error(messageValue));
  }
}
