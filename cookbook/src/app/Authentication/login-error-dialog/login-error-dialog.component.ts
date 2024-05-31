import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-error-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './login-error-dialog.component.html',
  styles: []
})
export class LoginErrorDialogComponent {

  constructor(private dialogRef: MatDialogRef<LoginErrorDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
