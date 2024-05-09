import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgIf,
    MatTooltipModule
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})

export class RecipeCardComponent {
  @Input() recipe?: Recipe;

  constructor(private router: Router) {}

  showDetails(): void {
    this.router.navigate([`/recipe/${this.recipe?.id}`]);
  }
}
