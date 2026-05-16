import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserFacadeService } from '../../services/user-facade/user-facade-service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { User } from '../../models/user.interface';
import { NzInputModule, NzInputSearchEvent } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { searchUser } from '../../utils/searchUser';
import { UserSearch } from "../user-search/user-search";
import { Pagination } from "../pagination/pagination";
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-list',
  imports: [
    NzCardModule,
    NzGridModule,
    NzPaginationModule,
    NzInputModule,
    FormsModule,
    UserSearch,
    Pagination,
    NzFlexModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit, OnDestroy {
  usersAll: User[] = [];
  filteredUsers: User[] = [];
  usersPerPage: User[] = [];

  pageSize = 6;
  currentPage = 1;

  isModalOpen = false;
  selectedUserId: number | null = null;

  private readonly userFacadeService = inject(UserFacadeService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();
  readonly message = inject(NzMessageService);

  get totalItems(): number {
    return this.filteredUsers.length;
  }

  ngOnInit() {
    this.userFacadeService.get().pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.usersAll = users;
      this.filteredUsers = users;
      this.updatePage();
    });
  }

  onSearch(e: NzInputSearchEvent) {
    this.filteredUsers = searchUser(e.value, this.usersAll);
    this.currentPage = 1;
    this.updatePage();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePage();
  }

  private updatePage() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.usersPerPage = this.filteredUsers.slice(start, end);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleNavigate(userId: number) {
    this.router.navigate(["/users", userId])
  }

  showModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  confirmDelete() {
    if (this.selectedUserId !== null) {
      this.userFacadeService.delete(this.selectedUserId)
      this.usersAll = this.usersAll.filter(u => u.id !== this.selectedUserId);
      this.filteredUsers = this.filteredUsers.filter(u => u.id !== this.selectedUserId);
      this.updatePage();
      this.isModalOpen = false;
      this.selectedUserId = null;
      this.message.create('success', 'Успешно удалено!');
    }
  }

  cancelDelete() {
    this.isModalOpen = false;
    this.selectedUserId = null;
  }

  handleDelete(e: PointerEvent, userId: number) {
    e.stopPropagation();
    this.selectedUserId = userId;
    this.isModalOpen = true;
  }
}
