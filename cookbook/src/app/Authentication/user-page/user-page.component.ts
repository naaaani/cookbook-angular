import { Component } from '@angular/core';
import { RecipeService } from '../../Recipe/recipe.service';
import { Recipe } from '../../Recipe/recipe';
import { NgFor, NgIf } from '@angular/common';
import { RecipeCardComponent } from '../../Recipe/recipe-card/recipe-card.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [NgIf,
    NgFor,
    RecipeCardComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  recipes: Recipe[] = [];
  errorMessage: string = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('id');

    if (!userId) {
      this.errorMessage = 'No user logged in.';
      return;
    }

    this.loadUserRecipes(userId);
  }

  async loadUserRecipes(userId: string) {
    try {
      this.recipes = await this.recipeService.getRecipesByUserId(userId);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      this.errorMessage = 'Error loading recipes.';
    }
  }
  }