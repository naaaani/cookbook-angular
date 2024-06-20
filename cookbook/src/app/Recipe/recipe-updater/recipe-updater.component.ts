import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { IngredientService } from '../../Ingredient/ingredient.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';
import { Ingredient } from '../../Ingredient/ingredient';
import { Subscription } from 'rxjs';
import { FileUploadComponent } from '../../file-upload/file-upload.component';


@Component({
  selector: 'app-recipe-updater',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatFormFieldModule,
    FileUploadComponent,
    MatOption,
    MatAutocompleteModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './recipe-updater.component.html',
  styleUrls: ['./recipe-updater.component.css']
})
export class RecipeUpdaterComponent implements OnInit {
  savedIngredients: string[] = [];
  image?: File;
  recipeForm: FormGroup;
  recipe?: Recipe;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
  ) {
    this.recipeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      createdBy: [''],
      ingredients: this.fb.array([]),
      vegan: [false],
      vegetarian: [false], 
      glutenFree: [false],
      dairyFree: [false],
      containsTreeNuts: [false],
    });
  }

  ngOnInit(): void {
    this.ingredientService.getAllIngredients().then(data => {
      this.savedIngredients = data.map(ingredient => ingredient.name);
    });

    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id != null) {
        this.recipeService.getRecipe(id)
          .then((recipe: Recipe) => {
            this.recipe = recipe;
            this.setFormData(recipe);
          });
      }
    });
  }

  displayFn(ingredient: string | null): string {
    return ingredient && ingredient? ingredient : '';
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  setFormData(recipe: Recipe) {
    this.recipeForm.patchValue({ 
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      vegan: recipe.vegan,
      vegetarian: recipe.vegetarian,
      glutenFree: recipe.glutenFree,
      dairyFree: recipe.dairyFree
    });

    recipe.ingredients.forEach(ingredient => {
      this.ingredients.push(this.fb.group({
        ingredient: [ingredient.ingredient, Validators.required],
        amount: [ingredient.amount, Validators.required],
      }));
    });
  }

  addIngredient(): void {
    const ingredientGroup = this.fb.group({
      ingredient: ['', Validators.required],
      amount: ['', Validators.required]
    });
  
    this.ingredients.push(ingredientGroup);
  }

  
  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addImage(addedImage: File) {
    this.image = addedImage;
  }

  saveRecipe() {
    if (this.recipeForm.valid) {
      const formData: FormData = new FormData();
      formData.append('recipeDTO', new Blob([JSON.stringify(this.recipeForm.value)], {
        type: 'application/json'
      }));

      if (this.image) {
        formData.append('image', this.image, this.image.name);
      }

      const id = this.recipe?.id;
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No auth token found in local storage');
        return;
      }

      fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('403 Forbidden: You do not have permission to perform this action.');
          } else {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
        }
        return response.json();
      })
      .then(data => {
        console.log('Recipe updated successfully:', data);
        this.router.navigate(['recipes']);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    } else {
      console.log("Invalid form");
      this.recipeForm.markAllAsTouched();
    }
  }
}
