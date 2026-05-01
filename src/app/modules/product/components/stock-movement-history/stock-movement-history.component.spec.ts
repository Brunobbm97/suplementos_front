import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementHistoryComponent } from './stock-movement-history.component';

describe('StockMovementHistoryComponent', () => {
  let component: StockMovementHistoryComponent;
  let fixture: ComponentFixture<StockMovementHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockMovementHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockMovementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
