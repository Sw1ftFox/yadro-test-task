import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Navigation } from "./components/navigation/navigation";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NzTypographyModule,
    NzDividerModule,
    Navigation
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
