import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filter-config',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './filter-config.component.html',
  styleUrl: './filter-config.component.scss'
})
export class FilterConfigComponent {
  selectedValues: { [key: string]: string } = {};
  selectedCount = 0;

  constructor(
    private dialogRef: MatDialogRef<FilterConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; items: { label: string; value: string }[] }[]
  ) {}

  selectItem(category: string, value: string) {
    this.selectedValues[category] = this.selectedValues[category] === value ? '' : value;
    this.updateSelectedCount();
  }

  isSelected(category: string, value: string): boolean {
    return this.selectedValues[category] === value;
  }

  onClear() {
    this.selectedValues = {};
    this.selectedCount = 0;
  }

  onApply() {
    this.dialogRef.close(this.selectedValues);
  }

  private updateSelectedCount() {
    this.selectedCount = Object.values(this.selectedValues).filter(v => v).length;
  }
}
