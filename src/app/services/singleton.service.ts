import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SortConfigComponent } from '../sort-config/sort-config.component';
import { FilterConfigComponent } from '../filter-config/filter-config.component';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {
   dialog = inject(MatDialog);
  openTreeListDialog(data: any) {
    return this.dialog.open(SortConfigComponent, {
      data,
      width: '400px',
      disableClose: true, // Prevents closing by clicking outside
    }).afterClosed();
  }
  openFilterDialog(data: any) {
    return this.dialog.open(FilterConfigComponent, {
      data,
      width: '400px',
      disableClose: true, // Prevents closing by clicking outside
    }).afterClosed();
  }
}
