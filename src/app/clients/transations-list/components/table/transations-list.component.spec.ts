import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransationsTableComponent } from './transations-list.component';

describe('TransationsListComponent', () => {
  let component: TransationsTableComponent;
  let fixture: ComponentFixture<TransationsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransationsTableComponent],
    });
    fixture = TestBed.createComponent(TransationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
