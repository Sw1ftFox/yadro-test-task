import { inject, Injectable } from '@angular/core';
import { NewUser, User } from '../../models/user.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api-service';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
  private readonly apiService = inject(ApiService);

  get(): Observable<User[]> {
    return this.apiService.get();
  }

  getDetailInfo(id: number): Observable<User> {
    return this.apiService.getDetailInfo(id);
  }

  create(user: NewUser): Observable<User> {
    return this.apiService.create(user);
  }

  update(user: User): Observable<User> {
    return this.apiService.update(user);
  }

  delete(id: number) {
    return this.apiService.delete(id);
  }
}
