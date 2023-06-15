import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTransactionListComponent } from './filter-transaction-list.component';

describe('FilterTransactionListComponent', () => {
  let component: FilterTransactionListComponent;
  let fixture: ComponentFixture<FilterTransactionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterTransactionListComponent]
    });
    fixture = TestBed.createComponent(FilterTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
