import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { SingletonService } from './services/singleton.service';
import { SortConfigComponent } from './sort-config/sort-config.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTabsModule,RouterOutlet,SortConfigComponent,MatRadioModule, MatButtonModule, MatStepperModule, ReactiveFormsModule, CommonModule, MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
   ss = inject(SingletonService);
    menuData = [
    {
      title: 'Exception',
      items: [
        { label: 'Newest First', value: 'firstArrival' },
        { label: 'Oldest First', value: 'lastArrival' },
        { label: 'Ascending', value: 'ascending' },
        { label: 'Descending', value: 'descending' },
      ],
    },
    {
      title: 'Truck',
      items: [
        { label: 'Ascending', value: 'ascending' },
        { label: 'Descending', value: 'descending' },
      ],
    },
  ];


  form: FormGroup;
  wegonData: any = null;
  containerData: any[] = [];
  exceptionData = [
    { wegon: { system_val: '1112', survey_val: 'fwer', is_manual: true, selected_key: '' } },
    { seal: { system_val: 'reer', survey_val: 'ttt', is_manual: true, selected_key: '' } },
    { hazard: { system_val: 'abc', survey_val: 'xyz', is_manual: false, selected_key: '' } },
  ];

  selectedTabIndex = 0;
  currentStep = 0;
  isAnyRadioSelected = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }


  // openDialog() {
  //   this.ss.openTreeListDialog(this.dialogData).subscribe(result => {
  //     if (result) {
  //       console.log('Selected:', result);
  //     }
  //   });
  // }


  // openFilterDialog() {
  //   this.ss.openFilterDialog(this.dialogData).subscribe(result => {
  //     if (result) {
  //       console.log('Selected:', result);
  //     }
  //   });
  // }

  ngOnInit() {
    this.processExceptions();
  }

  processExceptions() {
    this.exceptionData.forEach((exception, index) => {
      const key = Object.keys(exception)[0];
      const entry = exception[key as keyof typeof exception];

      if (key === 'wegon') {
        this.wegonData = entry; // If 'wegon' exists, set it
      } else {
        this.containerData.push({ key, data: entry }); // If not 'wegon', push to containerData
      }

      this.form.addControl(this.getDynamicKey(index), this.fb.control(''));
    });
  }

  getDynamicKey(index: number) {
    return `exception_${index}`;
  }

  isRadioSelected(index: number): boolean {
    return this.form.get(this.getDynamicKey(index))?.value !== '';
  }

  isLastStep(): boolean {
    return this.currentStep === this.containerData.length - 1;
  }

  getCurrentIndex(): number {
    return this.selectedTabIndex === 0 ? 0 : this.currentStep + 1;
  }

  nextStep() {
    if (this.selectedTabIndex === 0) {
      this.selectedTabIndex = 1; // Move to container tab
      this.currentStep = 0; // Reset to the first step
    } else if (this.currentStep < this.containerData.length - 1) {
      this.currentStep++; // Go to the next step
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--; // Go to the previous step
    } else {
      this.selectedTabIndex = 0; // Return to the Wegon tab
    }
  }

  submitData() {
    if (this.form.valid) {
      console.log('Submitted Data:', this.form.value);
    }
  }

  onRadioChange() {
    // Track if ANY radio button is selected in ANY step
    this.isAnyRadioSelected = Object.keys(this.form.controls).some(key => this.form.get(key)?.value !== '');
  }

  isSubmitEnabled(): boolean {
    return this.isAnyRadioSelected;
  }
}
