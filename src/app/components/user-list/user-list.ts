import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserFacadeService } from '../../services/user-facade/user-facade-service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-user-list',
  imports: [
    NzCardModule,
    NzGridModule,
    NzPaginationModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit, OnDestroy {
  readonly USERS_LIMIT = 6;
  private usersAll: User[] = [];
  usersPerPage: User[] = [];
  currentPage = 1;
  totalItems = 0;

  private readonly userFacadeService = inject(UserFacadeService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  ngOnInit() {
    this.userFacadeService.get()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        if (users) {
          this.usersAll = users;
          this.totalItems = users.length;
          this.updatePage();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPageIndexChange(page: number) {
    this.currentPage = page;
    this.updatePage();
  }

  private updatePage() {
    const start = (this.currentPage - 1) * this.USERS_LIMIT;
    const end = start + this.USERS_LIMIT;
    this.usersPerPage = this.usersAll.slice(start, end);
  }

  handleNavigate(userId: number) {
    this.router.navigate(["/users", userId])
  }
}
