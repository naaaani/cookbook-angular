import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecipeService } from '../recipe.service';
import { IngredientService } from '../../Ingredient/ingredient.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
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
    MatButton
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent implements OnInit {
  savedIngredients: Ingredient[] = [];
  image?: File;
  recipeForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
  ) {
    this.recipeForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
      isVegan: [false],
      isVegetarian: [false],
      isGlutenFree: [false],
      isDairyFree: [false]
    });

    this.ingredientService.getAllIngredients()
      .then(data => this.savedIngredients = data);
  }

  ngOnInit(): void {
    this.addIngredient();
  }

  displayFn(ingredient: Ingredient): string {
    return ingredient.name ? ingredient.name : '';
  }

  get ingredients(): FormArray {
    return this.recipeForm.controls["ingredients"] as FormArray;
  }

  addIngredient(): void {
    const ingredientGroup = this.formBuilder.group({
      id: [0],
      ingredient: ['', Validators.required],
      amount: ['', Validators.required],
      category: ['UNKNOWN'],
      approver: [false]
    });
    this.ingredients.push(ingredientGroup);
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
    if (this.recipeForm.valid) {
      const formData: FormData = new FormData();
      formData.append('recipeDTO', new Blob([JSON.stringify(this.recipeForm.value)], {
        type: 'application/json'
      }));

      if (this.image) {
        formData.append('image', this.image, this.image.name);
      }

      this.recipeService.postRecipe(formData);
    } else {
      console.log("Invalid form");
      this.recipeForm.markAllAsTouched();
    }
  }
}
