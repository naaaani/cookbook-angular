import {Component, OnInit} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import {ErrorMessageComponent} from "../../error-message/error-message.component";


@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    NgFor, NgIf,
    RecipeCardComponent, ErrorMessageComponent
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  error: string | null = null;

  constructor(private service: RecipeService) {}
   ngOnInit(): void {
      this.service.getAllRecipes()
          .then(({data, error}) => {
              this.recipes = data || [];
              this.error = error;
          });
  }
}
