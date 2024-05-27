import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-recipe-updater',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './recipe-updater.component.html',
  styleUrls: ['./recipe-updater.component.css']
})
export class RecipeUpdaterComponent implements OnInit {
  recipeForm: FormGroup;
  recipe?: Recipe;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {
    this.recipeForm = this.fb.group({
      id: [null],
      name: [''],
      description: [''],
      ingredients: this.fb.array([]),
      isVegan: [false],
      isVegetarian: [false], 
      isGlutenFree: [false], 
      isDairyFree: [false]
    });
  }

  ngOnInit() {
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

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  setFormData(recipe: Recipe) {
    this.recipeForm.patchValue({ 
      id: recipe.id, 
      name: recipe.name, 
      description: recipe.description, 
      isVegan: recipe.isVegan,
      isVegetarian: recipe.isVegetarian,
      isGlutenFree: recipe.isGlutenFree,
      isDairyFree: recipe.isDairyFree
    });

    recipe.ingredients.forEach(ingredient => {
      this.ingredients.push(this.fb.group({
        id: [ingredient.ingredient.id],
        ingredient: this.fb.group({
          id: [ingredient.ingredient.id],
          unitOfMeasure: [ingredient.ingredient.unitOfMeasure],
          name: [ingredient.ingredient.name],
          isGlutenFree: [ingredient.ingredient.isGlutenFree],
          isDairyFree: [ingredient.ingredient.isDairyFree],
          isMeatFree: [ingredient.ingredient.isMeatFree],
          isEggFree: [ingredient.ingredient.isEggFree]
        }),
        amount: [ingredient.amount]
      }));
    });
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  saveRecipe(id: number | undefined) {
    if (id !== undefined) {
      const updatedRecipe = this.recipeForm.value;
      console.log('Attempting to update recipe:', updatedRecipe);

      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No auth token found in local storage');
        return;
      }

      fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedRecipe)
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
    }
  }
}
