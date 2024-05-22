import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FileUploadComponent
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent {
  image?: File;
  
  addImage(addedImage: File) {
    this.image = addedImage;
  }
  
  // const formData = new FormData();

  // formData.append("thumbnail", file);

  constructor(private formBuilder: FormBuilder) {}

}
