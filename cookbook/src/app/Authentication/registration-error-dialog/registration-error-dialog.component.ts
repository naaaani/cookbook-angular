import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  standalone: true, 
  selector: 'app-registration-error-dialog',
  templateUrl: './registration-error-dialog.component.html',
  imports: [
    MatDialogModule,
  ],
  styleUrls: ['./registration-error-dialog.component.css']
})
export class RegistrationErrorDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<RegistrationErrorDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
