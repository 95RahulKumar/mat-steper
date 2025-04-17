import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioControlComponent } from './radio-control.component';

describe('RadioControlComponent', () => {
  let component: RadioControlComponent;
  let fixture: ComponentFixture<RadioControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
