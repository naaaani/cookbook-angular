import { Component, Inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Ingredient } from '../ingredient';
import { IngredientComponent } from '../ingredient/ingredient.component';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [
    IngredientComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css'
})
export class IngredientListComponent {
  ingredients: Ingredient[] = [];

  constructor(private ingredientService: IngredientService) {
    this.ingredientService.getAllIngredients()
    .then((ingredientList: Ingredient[]) => {
      this.ingredients = ingredientList;
    });
  }

  async deleteIngredient(id: string): Promise<void> {
    try {
        await this.ingredientService.deleteIngredient(id);
        this.ingredients = this.ingredients.filter(ingredient => {
            return ingredient.id !== undefined && ingredient.id.toString() !== id;
        });
    } catch (error) {
        console.error('Failed to delete ingredient:', error);
    }
}
  
}
