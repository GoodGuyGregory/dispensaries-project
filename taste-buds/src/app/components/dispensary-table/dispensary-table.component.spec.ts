import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryTableComponent } from './dispensary-table.component';

describe('DispensaryTableComponent', () => {
  let component: DispensaryTableComponent;
  let fixture: ComponentFixture<DispensaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DispensaryTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DispensaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
