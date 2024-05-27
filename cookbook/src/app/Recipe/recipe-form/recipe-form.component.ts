import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecipeService } from '../recipe.service';
import { IngredientService } from '../../Ingredient/ingredient.service';
import { IngredientAdderComponent } from './ingredient-adder/ingredient-adder.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FileUploadComponent,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    IngredientAdderComponent,
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

  submit() {}
  
  // formData.append("thumbnail", file);

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private ingredientService: IngredientService
  ) {
    this.recipeForm = formBuilder.group({
      name: '',
      description: '',
      ingredients: [],
      amount: '',
    })
  }

}
 