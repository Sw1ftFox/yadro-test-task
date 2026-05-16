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

@Component({
  selector: 'app-user-list',
  imports: [
    NzCardModule,
    NzGridModule,
    NzPaginationModule,
    NzInputModule,
    FormsModule,
    UserSearch,
    Pagination
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

  private readonly userFacadeService = inject(UserFacadeService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  get totalItems(): number {
    return this.filteredUsers.length;
  }

  ngOnInit() {
    this.userFacadeService.get().subscribe(users => {
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
}
