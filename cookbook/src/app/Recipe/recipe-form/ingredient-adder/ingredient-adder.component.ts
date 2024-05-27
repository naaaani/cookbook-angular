import { Component} from '@angular/core';
import { NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Ingredient } from '../../../Ingredient/ingredient';
import { IngredientService } from '../../../Ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient-adder',
  standalone: true,
  imports: [
    NgFor,
    MatInputModule,
    MatIcon,
    MatCardModule
  ],
  templateUrl: './ingredient-adder.component.html',
  styleUrl: './ingredient-adder.component.css'
})
export class IngredientAdderComponent {
  ingredients: Ingredient[] = [];
  
  bumpIngredients(): void {
    this.ingredients.push({})
  }

  deleteIngredient(id: number): void {
    this.ingredients.splice(id, 1);
  }

  constructor(private service: IngredientService) {
    this.ingredients.push({}, {})
  }

}
