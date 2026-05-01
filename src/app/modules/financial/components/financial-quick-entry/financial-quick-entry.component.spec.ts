import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialQuickEntryComponent } from './financial-quick-entry.component';

describe('FinancialQuickEntryComponent', () => {
  let component: FinancialQuickEntryComponent;
  let fixture: ComponentFixture<FinancialQuickEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialQuickEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialQuickEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
