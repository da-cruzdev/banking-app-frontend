import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransationsListComponent } from './transations-list.component';

describe('TransationsListComponent', () => {
  let component: TransationsListComponent;
  let fixture: ComponentFixture<TransationsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransationsListComponent]
    });
    fixture = TestBed.createComponent(TransationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
