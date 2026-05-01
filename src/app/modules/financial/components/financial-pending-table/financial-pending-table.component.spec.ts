import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPendingTableComponent } from './financial-pending-table.component';

describe('FinancialPendingTableComponent', () => {
  let component: FinancialPendingTableComponent;
  let fixture: ComponentFixture<FinancialPendingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialPendingTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialPendingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
