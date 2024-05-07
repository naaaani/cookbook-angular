import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  url = "/api/recipes";


  async getAllIRecipes(): Promise<Recipe> {
    const data = await fetch(this.url);
    console.log(data);
    
    return data.json() ?? [];
  }

  async getRecipe(id: number): Promise<Recipe[]> {

    const data = await fetch(this.url + '/' + (id));
    console.log(data);

    return data.json() ?? [];
  }

  constructor() { }

}