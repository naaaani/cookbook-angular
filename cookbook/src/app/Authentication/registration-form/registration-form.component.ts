import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RegistrationErrorDialogComponent } from '../registration-error-dialog/registration-error-dialog.component';
import { RegistrationSuccessDialogComponent } from '../registration-success-dialog/registration-success-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.pattern('.{5,}')
      ]],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm).then(() => {
        this.showRegistrationSuccessDialog();
      }).catch(() => {
        this.showRegistrationErrorDialog();
      });
    } else {
      this.showRegistrationErrorDialog();
    }
  }

  showRegistrationErrorDialog(): void {
    this.dialog.open(RegistrationErrorDialogComponent);
  }

  showRegistrationSuccessDialog(): void {
    const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
