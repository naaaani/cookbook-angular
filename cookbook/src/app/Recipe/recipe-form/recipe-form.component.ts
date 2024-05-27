import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormArray, FormBuilder } from '@angular/forms';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecipeService } from '../recipe.service';
import { IngredientService } from '../../Ingredient/ingredient.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Ingredient } from '../../Ingredient/ingredient';



@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    FileUploadComponent,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent {
  savedIngredients: Ingredient[] = [];
  image?: File;
  recipeForm: FormGroup

  // formData.append("thumbnail", file);

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
  ) {
    this.recipeForm = formBuilder.group({
      name: [''],
      description: [''],
      ingredients: this.formBuilder.array([]),
    });

    this.ingredientService.getAllIngredients()
      .then(data => this.savedIngredients = data);
  }

  get ingredients(): FormArray {
    return this.recipeForm.controls["ingredients"] as FormArray;
  }

  addIngredient() {
    const ingredientForm: FormGroup = this.formBuilder.group({
      amount: [''],
      ingredient: ['']
    });
    
    const control = <FormArray>this.recipeForm.controls['ingredients'];
    control.push(ingredientForm);
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  logFormValue(): void {
    console.log(this.recipeForm);
  }

  addImage(addedImage: File) {
    this.image = addedImage;
  }

  submit() { 
    console.log(this.recipeForm);
    
  }

}
