import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFailedComponent } from './dialog-failed.component';

describe('DialogFailedComponent', () => {
  let component: DialogFailedComponent;
  let fixture: ComponentFixture<DialogFailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFailedComponent]
    });
    fixture = TestBed.createComponent(DialogFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
