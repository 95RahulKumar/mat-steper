import { Component, Inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sort-config',
  standalone: true,
  imports: [MatListModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './sort-config.component.html',
  styleUrl: './sort-config.component.scss'
})
export class SortConfigComponent {
  selectedCategory: string | null = null;
  selectedValue: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<SortConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; items: { label: string; value: string }[] }[]
  ) {}

  selectItem(category: string, value: string) {
    this.selectedCategory = category;
    this.selectedValue = value;
  }

  isSelected(category: string, value: string) {
    return this.selectedCategory === category && this.selectedValue === value;
  }

  closeDialog(result: any = null) {
    this.dialogRef.close(result);
  }

  onApply() {
    this.closeDialog( { sortKey: this.selectedCategory, selectedValue: this.selectedValue });
  }
}
