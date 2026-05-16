import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { BehaviorSubject, catchError, finalize, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ModesType } from '../../models/form.interface';
import { UserFacadeService } from '../../services/user-facade/user-facade-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from "ng-zorro-antd/spin";

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule,
    NzIconModule,
    NzMenuModule,
    NzSpinModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm implements OnDestroy {
  private readonly userFacadeService = inject(UserFacadeService);
  readonly message = inject(NzMessageService);

  private destroy$ = new Subject<void>();
  readonly loading$ = new BehaviorSubject(false);

  readonly form = new FormGroup({
    mode: new FormControl<ModesType>('add', [Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    username: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.email, Validators.required]),
  });

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(e: SubmitEvent): void {
    e.preventDefault();
    if (!this.form.valid) return;

    this.loading$.next(true);
    const mode = this.form.controls.mode.value;

    if (mode === 'add') {
      const newUser = {
        email: this.form.value.email || '',
        username: this.form.value.username || '',
        name: this.form.value.name || ''
      };
      this.userFacadeService.create(newUser).pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading$.next(false))
      ).subscribe({
        next: () => {
          this.message.create('success', 'Успешно создано!');
          this.form.reset();
        },
        error: () => this.message.create('error', 'Ошибка при создании!')
      });
    } else {
      this.userFacadeService.get().pipe(
        takeUntil(this.destroy$),
        switchMap(users => {
          const existingUser = users.find(u => u.username === this.form.value.username);
          if (!existingUser) {
            throw new Error('Пользователь не найден');
          }
          const updatedUser = {
            id: existingUser.id,
            email: this.form.value.email || '',
            username: this.form.value.username || '',
            name: this.form.value.name || ''
          };
          return this.userFacadeService.update(updatedUser);
        }),
        finalize(() => this.loading$.next(false)),
        catchError(err => {
          this.message.create('error', err.message === 'Пользователь не найден'
            ? 'Пользователь с таким никнеймом не существует'
            : 'Ошибка при обновлении');
          return of(null);
        })
      ).subscribe({
        next: (result) => {
          if (result) {
            this.message.create('success', 'Успешно обновлено!');
            this.form.reset();
          }
        }
      });
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.form.reset();
  }
}
