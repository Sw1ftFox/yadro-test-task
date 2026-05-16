import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.interface';
import { UserFacadeService } from '../../services/user-facade/user-facade-service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-user-detail-info',
  imports: [
    NzCardModule,
    NzDescriptionsModule,
    NzGridModule,
    CommonModule,
    NzIconModule,
    NzSpinModule,
    NzButtonModule
  ],
  templateUrl: './user-detail-info.html',
  styleUrl: './user-detail-info.scss',
})
export class UserDetailInfo implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userFacadeService = inject(UserFacadeService);

  private readonly destroy$ = new Subject<void>();
  readonly loading$ = new BehaviorSubject(false);

  id: string | null = '';
  user: User | null = null;

  ngOnInit() {
    this.loading$.next(true);
    this.id = this.route.snapshot.paramMap.get("id");
    this.userFacadeService.getDetailInfo(Number(this.id)).pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user) {
        this.user = user;
      }
      this.loading$.next(false);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

  handleNavigate() {
    this.router.navigate(["/users"])
  }
}
