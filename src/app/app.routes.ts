import { Routes } from '@angular/router';
import { App } from './app';
import { UserList } from './components/user-list/user-list';
import { UserForm } from './components/user-form/user-form';
import { UserDetailInfo } from './components/user-detail-info/user-detail-info';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: 'users', component: UserList },
  { path: 'users/:id', component: UserDetailInfo },
  { path: 'form', component: UserForm },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', component: NotFound }
];
