import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser, User } from '../../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://jsonplaceholder.typicode.com/users';

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getDetailInfo(id: number): Observable<User> {
    return this.http.get<User>(this.url + `/${id}`);
  }

  create(user: NewUser): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.url + `/${user.id}`, user);
  }

  delete(id: number) {
    this.http.delete(this.url + `/${id}`);
  }
}
