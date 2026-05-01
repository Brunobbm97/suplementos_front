import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialSummaryCardsComponent } from './financial-summary-cards.component';

describe('FinancialSummaryCardsComponent', () => {
  let component: FinancialSummaryCardsComponent;
  let fixture: ComponentFixture<FinancialSummaryCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialSummaryCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialSummaryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
