import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundDispensariesComponent } from './found-dispensaries.component';

describe('FoundDispensariesComponent', () => {
  let component: FoundDispensariesComponent;
  let fixture: ComponentFixture<FoundDispensariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoundDispensariesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoundDispensariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
