import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { SingletonService } from './services/singleton.service';
import { SortConfigComponent } from './sort-config/sort-config.component';
import { IFile, RadioControlComponent } from './radio-control/radio-control.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CustomFormFieldControlComponent } from './advanced-search-control/custom-form-field-control/custom-form-field-control.component';

export interface IFlateExceptions
{
    group:string,
    exceptions:IExceptions[]
}

export interface IExceptions{
    exception_id: number,
    exception_category: string,
    attribute_name:string,
    group:string,
    display_text: string,
    is_manual: true,
    predicted_value: {
      value: string,
      evidence: string,
      video_evidence: string,
    },
    tos_value: {
      value: string,
      evidence: string,
      video_evidence: string,
    },
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTabsModule,MatFormFieldModule,CustomFormFieldControlComponent,RouterOutlet,SortConfigComponent,RadioControlComponent,MatRadioModule, MatButtonModule, MatStepperModule, ReactiveFormsModule, CommonModule, MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
   ss = inject(SingletonService);

   selectedTabIndex = 0;
   currentStep = 0;
   totalSteps:IExceptions[]=[]
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
   exceptionsData = [
    {
      exception_id: 1,
      exception_category: "truck",
      display_text: "Truck",
      is_manual: true,
      group: "Truck",
      predicted_value: {
        value: "HSWW01",
        evidence: "imageI.jpg",
        video_evidence: "videoI.mp4",
      },
      tos_value: {
        value: "HSWW02",
        evidence: "imageJ.jpg",
        video_evidence: "videoJ.mp4",
      },
    },
    {
      exception_id: 1,
      exception_category: "reefer",
      display_text: "Truck",
      is_manual: true,
      group: "Truck",
      predicted_value: {
        value: "HSWW03",
        evidence: "imageI.jpg",
        video_evidence: "videoI.mp4",
      },
      tos_value: {
        value: "HSWW04",
        evidence: "imageJ.jpg",
        video_evidence: "videoJ.mp4",
      },
    },
    {
      exception_id: 1,
      exception_category: "seals",
      group: "Container",
      display_text: "Seals",
      is_manual: true,
      predicted_value: {
        value: "HSWW05",
        evidence: "imageI.jpg",
        video_evidence: "videoI.mp4",
      },
    },
    {
      exception_id: 1,
      exception_category: "Hazard",
      group: "Container",
      display_text: "Hazard",
      is_manual: true,
      predicted_value: {
        value: "HSWW06",
        evidence: "imageI.jpg",
        video_evidence: "videoI.mp4",
      },
    },

    {
      exception_id: 1,
      exception_category: "iso",
      group: "Container",
      display_text: "ISO",
      is_manual: true,
      predicted_value: {
        value: "HSWW07",
        evidence: "imageI.jpg",
        video_evidence: "videoI.mp4",
      },
    },
  ];
  isAnyRadioSelected = false;


 flateExceptions:IFlateExceptions[] = []
  constructor(private fb: FormBuilder,private cdRef:ChangeDetectorRef) {
    this.form = this.fb.group({
      exceptions: this.fb.array([]), // FormArray to hold exception FormGroups
    });
  }
 formArray(){
  return this.form.get('exceptions') as FormArray
 }

  ngOnInit() {
    this.processExceptions();
    const fisrtTabException = this.flateExceptions[0]?.exceptions
    // console.log(fisrtTabException)
    // this.totalSteps = []
    this.totalSteps= fisrtTabException
  }
  tabSwitch:boolean= true
  onTabChange(e:MatTabChangeEvent){
    this.tabSwitch= false
    // requestAnimationFrame(() => {
      const tabExceptions = this.flateExceptions[e?.index]?.exceptions;
      this.tabSwitch= true
        this.totalSteps = tabExceptions;
        this.currentStep = 0
    // },);
   
this.cdRef.detectChanges()
  
   
 
  }
  processExceptions() {

    this.flateExceptions =  Object.values(
      this.exceptionsData.reduce((acc:any, item) => {
        // Get the group key
        const groupKey = item.group;
  
        // Initialize group if it doesn't exist
        if (!acc[groupKey]) {
          acc[groupKey] = { group: groupKey, exceptions: [] };
        }
  
        // Push the exception into the respective group
        acc[groupKey].exceptions.push(item);
  
        return acc;
      }, {})
    );
    console.log(this.flateExceptions)
    this.exceptionsData.forEach((item, index) => {
      this.formArray().push(
        this.fb.group({
          [item.exception_category]: [''],
          manual: [''],
          imageUrl:['']
        })
      );

    });
  }

  getFormGroupIndex(cat:string){
    return this.exceptionsData.findIndex(item=>item?.exception_category == cat)
  
  }
  getDynamicKey(index:number){
    return this.exceptionsData[index]?.exception_category
  }

  handleFileChange(obj:IFile){
    const fgIndex = this.getFormGroupIndex(obj?.cat);
    const fg = this.formGroupAtIndex(fgIndex)
    const imgFc = fg.get('imageUrl') as FormControl;
    imgFc?.setValue(obj?.imageUrl)
    console.log(imgFc?.value);
  }

  getImageUrlValueByCategory(attCat:string){
    const fgIndex = this.getFormGroupIndex(attCat);
    const fg = this.formGroupAtIndex(fgIndex)
    const imgFc = fg.get('imageUrl') as FormControl;
    return imgFc?.value
  }

  formGroupAtIndex(index: number) {
    const formArray = this.formArray();
    const fg = formArray.at(index) as FormGroup;
    return fg;
  }

  isRadioSelected(index: number): boolean {
    // checking if radio button is checked for specific formcontrol
    // getting form array
    // we will se if manual valu validation is rquired
    const fg = this.formGroupAtIndex(index);
    const mfc = fg?.get('manual');
    const dynamicFc = fg?.get(this.getDynamicKey(index));
    return dynamicFc?.value !== '';
    return false
  }

  onRadioChange(){

  }


  isFirstStep(): boolean {
    return this.selectedTabIndex === 0 && this.currentStep === 0;
  }

  isLastStep(): boolean {
    return (
      this.selectedTabIndex === this.flateExceptions.length - 1 &&
      this.currentStep === this.flateExceptions[this.selectedTabIndex].exceptions.length - 1
    );
  }

  isSubmitEnabled(): boolean {
    return this.isLastStep() && this.isRadioSelected(this.currentStep);
  }

  nextStep() {
    const currentTab = this.flateExceptions[this.selectedTabIndex];
    if (this.currentStep < currentTab.exceptions.length - 1) {
      this.currentStep++;
    } else if (this.selectedTabIndex < this.flateExceptions.length - 1) {
      this.selectedTabIndex++;
      this.currentStep = 0;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    } else if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
      this.currentStep = this.flateExceptions[this.selectedTabIndex].exceptions.length - 1;
    }
  }

  submitData(){
   console.log( this.form.value )
  }
}
