import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecipeService } from '../recipe.service';
import { IngredientService } from '../../Ingredient/ingredient.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FileUploadComponent,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent {
  image?: File;
  recipeForm: FormGroup
  
  addImage(addedImage: File) {
    this.image = addedImage;
  }
  
  // formData.append("thumbnail", file);

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private ingredientService: IngredientService
  ) {
    this.recipeForm = formBuilder.group({
      name: '',
      description: '',
      ingredients: []
    })
  }

}
