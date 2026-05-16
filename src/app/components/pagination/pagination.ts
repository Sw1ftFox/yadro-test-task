import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzPaginationModule } from "ng-zorro-antd/pagination";

@Component({
  selector: 'app-pagination',
  imports: [NzPaginationModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  @Input() totalItems = 0;
  @Input() pageSize = 6;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
