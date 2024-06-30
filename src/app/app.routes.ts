import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'task',
    loadComponent: () => import('./task-list/task-list.component'),
  },
  {
    path: '',
    redirectTo: 'task',
    pathMatch: 'full',
  },
];
