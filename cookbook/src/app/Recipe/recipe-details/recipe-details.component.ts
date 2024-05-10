import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Component } from '@angular/core';
import { Recipe } from '../recipe';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatDividerModule,
    MatIcon,
    MatTooltip
  ],
})
export class RecipeDetailsComponent {
  recipe?: Recipe

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'))
      if (id != null) {
        this.recipeService.getRecipe(id)
          .then((recipe: Recipe) => {
            this.recipe = recipe;
            console.log(recipe);
          });
      }
    });
  }
}
