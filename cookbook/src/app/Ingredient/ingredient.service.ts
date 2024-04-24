import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  url = "/api/ingredients";

  async getAllIngredients(): Promise<Ingredient[]> {
    console.log('hello');
    
    const data = await fetch(this.url);
    console.log(data);
    
    return data.json() ?? [];
  }

  constructor() { }
}
