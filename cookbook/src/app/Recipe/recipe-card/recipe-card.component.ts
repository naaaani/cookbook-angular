import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})

export class RecipeCardComponent implements OnInit {
  placeholderImg: string = '../../../assets/palceholder.svg';
  imageSource: string = this.placeholderImg;
  @Input() recipe: Recipe = {
    ingredients	 : [{ingredient: {}, amount: 0}],
    name : '',
    description	: '',
    isVegan	: false,
    isVegetarian : false,
    isGlutenFree : false,
    isDairyFree : false,
    imageUrl: '',
  };

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    fetch(this.recipe.imageUrl).then(res => {
      if (res.ok) {
        return this.recipe.imageUrl;
      }
      return this.placeholderImg;
    }).then(res => this.imageSource = res);
  }

  showDetails(): void {
    this.router.navigate([`/recipe/${this.recipe?.id}`]);
  }
}
