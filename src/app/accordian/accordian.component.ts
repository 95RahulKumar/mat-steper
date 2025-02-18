import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-accordian',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './accordian.component.html',
  styleUrl: './accordian.component.scss'
})
export class AccordianComponent {
  rails = [
    { railNumber: 'R001', wagons: [{ wagonId: 'W101' }, { wagonId: 'W102' }] },
    { railNumber: 'R002', wagons: [{ wagonId: 'W201' }, { wagonId: 'W202' }] },
    { railNumber: 'R003', wagons: [{ wagonId: 'W301' }, { wagonId: 'W302' }] },
  ];

  displayedColumns: string[] = ['wagonId'];
  openedAccordion: string | null = this.rails[0].railNumber; // Open first accordion
  filteredRails = [...this.rails];
  filteredWagons: Record<string, any[]> = {};

  constructor() {
    this.resetFilteredWagons();
  }

  filterData(event:Event) {
    const searchText = (event.target as HTMLInputElement).value; // ✅ Proper casting
  
    if (!searchText) {
      this.filteredRails = [...this.rails];
      this.resetFilteredWagons();
      this.openedAccordion = this.rails[0].railNumber; // Reset to first accordion
      return;
    }
  
    const lowerSearch = searchText.toLowerCase();
    let matchingRail = null;
  
    // Filter Rails (Accordion Headers)
    this.filteredRails = this.rails.filter(rail => {
      const railMatch = rail.railNumber.toLowerCase().includes(lowerSearch);
      const wagonMatch = rail.wagons.some(wagon => wagon.wagonId.toLowerCase().includes(lowerSearch));
  
      if (railMatch || wagonMatch) matchingRail = rail.railNumber;
      return railMatch || wagonMatch;
    });
  
    // Open the matching accordion
    if (matchingRail) {
      this.openedAccordion = matchingRail;
    }
  
    // Filter Wagons inside the matched rail
    this.filteredWagons = {};
    this.filteredRails.forEach(rail => {
      this.filteredWagons[rail.railNumber] = rail.wagons.filter(wagon =>
        wagon.wagonId.toLowerCase().includes(lowerSearch) || rail.railNumber.toLowerCase().includes(lowerSearch)
      );
    });
  }
  
  resetFilteredWagons() {
    this.filteredWagons = {};
    this.rails.forEach(rail => {
      this.filteredWagons[rail.railNumber] = rail.wagons;
    });
  }
}
