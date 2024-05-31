import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registration-error-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './registration-error-dialog.component.html',
  styles: []
})
export class RegistrationErrorDialogComponent {

  constructor(private dialogRef: MatDialogRef<RegistrationErrorDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
