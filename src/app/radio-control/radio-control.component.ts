import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, inject, Input, Output, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { IExceptions } from '../app.component';
export interface IFile{
  imageUrl: string,
  cat: string 
}
@Component({
  selector: 'app-radio-control',
  standalone: true,
  imports: [ReactiveFormsModule,MatRadioModule
     , ReactiveFormsModule, CommonModule, MatIconModule,MatIconModule
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
  @Input() imageUrl!:string
  @Output() imageEmitter = new EventEmitter<IFile>();

  onRadioChange(){

  }

  onFileChange(event: Event,cat:string){
    const input = event.target as HTMLInputElement;
    const baseUrl = 'file:///C:/Users/PSM/Desktop/';
    console.log(input?.files?.[0]?.name);
    const fileName = input?.files?.[0]?.name
    const imageUrl:string = baseUrl + fileName;
    this.imageEmitter.emit({
      imageUrl,
      cat
    })
  }

  onDelete(cat:string){
    this.imageEmitter.emit({
      imageUrl:'',
      cat
    })
  }
}
