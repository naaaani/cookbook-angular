import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { LoginErrorDialogComponent } from '../login-error-dialog/login-error-dialog.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  login(): void {
    try {
      this.userService.login(this.loginForm);
      this.router.navigate(['recipes']);
    } catch (error) {
      this.showLoginErrorDialog();
      console.error('Login request failed:', error);
    }
  }

  showLoginErrorDialog(): void {
    this.dialog.open(LoginErrorDialogComponent);
  }

  logOut(): void {
    this.userService.logOut();
  }
}
