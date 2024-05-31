import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationErrorDialogComponent } from './registration-error-dialog.component';

describe('RegistrationErrorDialogComponent', () => {
  let component: RegistrationErrorDialogComponent;
  let fixture: ComponentFixture<RegistrationErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationErrorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
