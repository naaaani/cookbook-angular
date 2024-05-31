import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSuccessDialogComponent } from './registration-success-dialog.component';

describe('RegistrationSuccessDialogComponent', () => {
  let component: RegistrationSuccessDialogComponent;
  let fixture: ComponentFixture<RegistrationSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationSuccessDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
