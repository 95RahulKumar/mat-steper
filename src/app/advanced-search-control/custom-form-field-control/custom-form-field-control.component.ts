import { MatInput, MatInputModule } from '@angular/material/input';
import { FocusMonitor } from '@angular/cdk/a11y';
import {MatSelectModule} from '@angular/material/select';
import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  OnDestroy,
  Optional,
  Self,
  DoCheck,
} from '@angular/core';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import {
  NgControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  AbstractControlDirective,
} from '@angular/forms';
import {
  ErrorStateMatcher,

  mixinErrorState,
  mixinDisabled,
  
} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
export interface FornFieldValue{
  query:string,
  scope:string,

}
@Component({
  selector: 'app-custom-form-field-control',
  templateUrl: './custom-form-field-control.component.html',
  standalone:true,
  imports: [
   CommonModule,MatFormFieldModule,MatInputModule,MatSelectModule,ReactiveFormsModule,MatDividerModule
  ],
  styleUrls: ['./custom-form-field-control.component.scss'],
 providers:[
  {
    provide:MatFormFieldModule,
    useExisting:CustomFormFieldControlComponent
  }
 ]

})
export class CustomFormFieldControlComponent implements OnInit, MatFormFieldControl<FornFieldValue>{
  value!: FornFieldValue | null;
  stateChanges!: Observable<void>;
  id!: string;
  ngControl!: NgControl | AbstractControlDirective | null;
  focused!: boolean;
  empty!: boolean;
  shouldLabelFloat!: boolean;
  required!: boolean;
  errorState!: boolean;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  disableAutomaticLabeling?: boolean | undefined;
   setDescribedByIds(ids: string[]): void {
    // throw new Error('Method not implemented.');
  }
   onContainerClick(event: MouseEvent): void {
    // throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
   
  }
  disabled:boolean = false;
  form!:FormGroup
  placeholder:string = 'Search a Value'
}