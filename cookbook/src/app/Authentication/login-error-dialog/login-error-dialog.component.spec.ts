import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginErrorDialogComponent } from './login-error-dialog.component';

describe('LoginErrorDialogComponent', () => {
  let component: LoginErrorDialogComponent;
  let fixture: ComponentFixture<LoginErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginErrorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
