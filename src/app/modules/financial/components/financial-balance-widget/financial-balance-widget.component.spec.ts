import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialBalanceWidgetComponent } from './financial-balance-widget.component';

describe('FinancialBalanceWidgetComponent', () => {
  let component: FinancialBalanceWidgetComponent;
  let fixture: ComponentFixture<FinancialBalanceWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialBalanceWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialBalanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
