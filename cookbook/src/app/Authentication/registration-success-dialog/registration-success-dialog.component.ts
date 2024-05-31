import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registration-success-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './registration-success-dialog.component.html',
  styles: []
})
export class RegistrationSuccessDialogComponent {

  constructor(private dialogRef: MatDialogRef<RegistrationSuccessDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
