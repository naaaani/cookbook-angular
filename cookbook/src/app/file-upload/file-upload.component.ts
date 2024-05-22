import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  fileName = '';
  @Output() fileEvent = new EventEmitter<File>();

  constructor() { }

  onFileSelected(event: any) {

    const uploadedFile: File = event.target.files[0];

    if (uploadedFile) {
      this.fileName = uploadedFile.name;
      this.fileEvent.emit(uploadedFile);
    }
  }
}
