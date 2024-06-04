import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Component } from '@angular/core';
import { Recipe } from '../recipe';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';

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
  linkRoot: string = 'http://localhost:4200';
  placeholder = '../../../assets/palceholder.svg';
  imageSource: string = this.placeholder;

  recipe?: Recipe

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'))
      if (id != null) {
        this.recipeService.getRecipe(id)
          .then((recipe: Recipe) => {
            this.recipe = recipe;
            fetch(this.linkRoot + this.recipe.imageUrl).then(res => {
              if (res.ok) {
                return this.recipe ? this.recipe.imageUrl : this.placeholder;
              }
              return this.placeholder;
            }).then(res => this.imageSource = res);
          });
      }
    });
  }

  isLoggedIn(): boolean {
    if (localStorage.hasOwnProperty("token")) {
      return true;
    }
    return false;
  }

  updateRecipe(id: any): void {
    this.router.navigate([`/update/${id}`]);
  }
}
