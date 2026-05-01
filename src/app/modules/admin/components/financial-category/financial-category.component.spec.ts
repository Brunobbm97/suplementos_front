import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialCategoryComponent } from './financial-category.component';

describe('FinancialCategoryComponent', () => {
  let component: FinancialCategoryComponent;
  let fixture: ComponentFixture<FinancialCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
