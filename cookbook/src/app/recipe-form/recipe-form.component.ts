import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../Recipe/recipe.service';


@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent {
  recipeForm: FormGroup;
  imageFile!: { link: string; file: any; name: string; };
  placeholder: string = "../assets/palceholder.svg"

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
  ) {
    this.recipeForm = this.formBuilder.group({
      Title: '',
      Description: ''
    });
  }

  imagesPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  save(): void {
    const formData = new FormData();
    formData.append('myImageToSend', this.imageFile.file);
    formData.append('title', 'Set your title name here');
    formData.append('description', 'Set your title description here');

    //this.recipeService.postRecipe(formData).subscribe(data => { });
  }
}
