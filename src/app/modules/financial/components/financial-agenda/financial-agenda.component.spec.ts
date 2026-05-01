import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialAgendaComponent } from './financial-agenda.component';

describe('FinancialAgendaComponent', () => {
  let component: FinancialAgendaComponent;
  let fixture: ComponentFixture<FinancialAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
