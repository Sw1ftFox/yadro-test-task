import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailInfo } from './user-detail-info';

describe('UserDetailInfo', () => {
  let component: UserDetailInfo;
  let fixture: ComponentFixture<UserDetailInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
