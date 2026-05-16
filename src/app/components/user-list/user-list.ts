import { Component, inject } from '@angular/core';
import { UserFacadeService } from '../../services/user-facade/user-facade-service';
import { AsyncPipe } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [
    AsyncPipe,
    NzCardModule,
    NzGridModule,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  private readonly userFacadeService = inject(UserFacadeService);
  readonly users$ = this.userFacadeService.get();

  private readonly router = inject(Router);

  handleNavigate(userId: number) {
    this.router.navigate(["/users", userId])
  }
}
