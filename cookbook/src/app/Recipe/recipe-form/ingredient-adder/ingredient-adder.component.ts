import { Component, EventEmitter, Output} from '@angular/core';
import { NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Ingredient } from '../../../Ingredient/ingredient';
import { IngredientService } from '../../../Ingredient/ingredient.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

interface IngredientForRecipe {
  id: null
      ingredient?: {
        id: number,
        name: "string",
        unitOfMeasure: "string",
        isGlutenFree: boolean,
        isDairyFree: boolean,
        isMeatFree: boolean,
        isEggFree:boolean
      },
      amount: number
}

@Component({
  selector: 'app-ingredient-adder',
  standalone: true,
  imports: [
    NgFor,
    MatInputModule,
    MatIcon,
    MatCardModule,
    MatAutocompleteModule,
  ],
  templateUrl: './ingredient-adder.component.html',
  styleUrl: './ingredient-adder.component.css'
})

export class IngredientAdderComponent {
  savedIngredients: Ingredient[] = [];
  ingredientsForm: FormGroup;
  @Output() ingredientsAdded = new EventEmitter<{ amount: string, ingredient: string }[]>();

  constructor(private fb: FormBuilder, private service: IngredientService) {
    this.ingredientsForm = this.fb.group({
      ingredients: this.fb.array([this.createIngredient()])
    });

    this.service.getAllIngredients()
    .then(data => this.savedIngredients = data);

  }

  get ingredients() {
    return this.ingredientsForm.get('ingredients') as FormArray;
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      amount: '',
      ingredient: ''
    });
  }

  addIngredient() {
    this.ingredients.push(this.createIngredient());
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  submitIngredients() {
    this.ingredientsAdded.emit(this.ingredients.value);
  }

}
