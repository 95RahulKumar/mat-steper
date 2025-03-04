import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortConfigComponent } from './sort-config.component';

describe('SortConfigComponent', () => {
  let component: SortConfigComponent;
  let fixture: ComponentFixture<SortConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
