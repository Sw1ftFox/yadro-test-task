import { Routes } from '@angular/router';
import { App } from './app';
import { UserList } from './components/user-list/user-list';
import { UserForm } from './components/user-form/user-form';
import { UserDetailInfo } from './components/user-detail-info/user-detail-info';

export const routes: Routes = [
  { path: "", component: UserList },
  { path: "users", component: UserList },
  { path: "users/form", component: UserForm },
  { path: "users/:id", component: UserDetailInfo },
  { path: "**", redirectTo: "" },
];
