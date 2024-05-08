import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})

export class RecipeCardComponent {
  @Input() recipe?: Recipe;
}
