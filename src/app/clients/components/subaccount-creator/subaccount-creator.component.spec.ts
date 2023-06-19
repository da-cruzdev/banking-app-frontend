import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubaccountCreatorComponent } from './subaccount-creator.component';

describe('SubaccountCreatorComponent', () => {
  let component: SubaccountCreatorComponent;
  let fixture: ComponentFixture<SubaccountCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubaccountCreatorComponent]
    });
    fixture = TestBed.createComponent(SubaccountCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
