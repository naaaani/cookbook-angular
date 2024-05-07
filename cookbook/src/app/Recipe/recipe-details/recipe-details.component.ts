import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Component } from '@angular/core';
import { Recipe } from '../recipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
  standalone: true, 
  imports: [
    NgIf
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
      if(id != null){        
      this.recipeService.getRecipe(id)
        .then((recipe: Recipe) => {
          this.recipe = recipe;
          console.log(recipe);
        });
      }
    });
  }
}
