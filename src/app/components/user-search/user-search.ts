import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule, NzInputSearchEvent } from "ng-zorro-antd/input";

@Component({
  selector: 'app-user-search',
  imports: [NzInputModule, FormsModule],
  templateUrl: './user-search.html',
  styleUrl: './user-search.scss',
})
export class UserSearch {
  @Output() search = new EventEmitter<NzInputSearchEvent>();

  term = ""
  onTermChange(value: string) {
    setTimeout(() => this.search.emit({ value } as NzInputSearchEvent), 300);
  }
}
