import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, Input, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { IExceptions } from '../app.component';

@Component({
  selector: 'app-radio-control',
  standalone: true,
  imports: [ReactiveFormsModule,MatRadioModule
     , ReactiveFormsModule, CommonModule, MatIconModule
  ],
  viewProviders:[
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    }
  ],
  templateUrl: './radio-control.component.html',
  styleUrl: './radio-control.component.scss'
})
export class RadioControlComponent {
  @Input()step!:IExceptions;


  onRadioChange(){

  }
}
