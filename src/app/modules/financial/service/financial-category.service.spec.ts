import { TestBed } from '@angular/core/testing';

import { FinancialCategoryService } from './financial-category.service';

describe('FinancialCategoryService', () => {
  let service: FinancialCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
