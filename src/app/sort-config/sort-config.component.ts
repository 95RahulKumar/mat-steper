import { Component, Input, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sort-config',
  standalone: true,
  imports: [MatListModule, CommonModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './sort-config.component.html',
  styleUrl: './sort-config.component.scss'
})
export class SortConfigComponent {
  selectedCategory: string = 'Exception';
  selectedValue: string = 'lastArrival';

  isSelectionChanged: boolean = false;  

    appliedCategory: string = this.selectedCategory;
   appliedValue: string = this.selectedValue;

  @Input() menuData: { title: string; items: { label: string; value: string }[] }[] = [];
  @ViewChild(MatMenuTrigger) matMenuTrigger!: MatMenuTrigger;

  constructor() {
  }

  selectItem(category: string, value: string) {
      this.selectedCategory = category;
      this.selectedValue = value;
      this.isSelectionChanged = true;
  }

  openMenu() {
    this.isSelectionChanged = false; 
    if (!this.isSelectionChanged) {
      this.selectedCategory = this.appliedCategory;
      this.selectedValue = this.appliedValue;
    }
  }

  closeDialog() { 
    this.matMenuTrigger.closeMenu();
  }

  onApply() {
    this.appliedCategory = this.selectedCategory;
    this.appliedValue = this.selectedValue;
    this.matMenuTrigger.closeMenu();
  }

  resetInitial(){

  }
}
