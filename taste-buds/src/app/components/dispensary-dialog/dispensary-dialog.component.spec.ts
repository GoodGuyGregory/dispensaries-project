import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryDialogComponent } from './dispensary-dialog.component';

describe('DispensaryDialogComponent', () => {
  let component: DispensaryDialogComponent;
  let fixture: ComponentFixture<DispensaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DispensaryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DispensaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
