import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    UserList,
    NzTypographyModule,
    NzDividerModule,
    RouterLink,
    NzIconModule,
    NzMenuModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
