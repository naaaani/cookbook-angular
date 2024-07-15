import { Component } from '@angular/core';
import { RecipeService } from '../../Recipe/recipe.service';
import { Recipe } from '../../Recipe/recipe';
import { NgFor, NgIf } from '@angular/common';
import { RecipeCardComponent } from '../../Recipe/recipe-card/recipe-card.component';
import { ErrorMessageComponent } from "../../error-message/error-message.component";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [NgIf,
    NgFor,
    RecipeCardComponent,
    ErrorMessageComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  recipes: Recipe[] = [];
  errorMessage: string | null = null;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('id');

    if (!userId) {
      this.errorMessage = 'No user logged in.';
      return;
    }

    this.loadUserRecipes(userId);
  }

  loadUserRecipes(userId: string) {
    this.recipeService.getRecipesByUserId(userId)
        .then(({data, error}) => {
          this.recipes = data || [];
          this.errorMessage = error;
        });
  }
}
