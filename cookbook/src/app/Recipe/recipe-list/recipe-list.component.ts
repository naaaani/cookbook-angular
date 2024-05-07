import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    NgFor,
    RecipeCardComponent
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: [Recipe] = this.service.getAllRecipes();

  constructor(private service: RecipeService) {}
}
