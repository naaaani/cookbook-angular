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

  async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
    const token = localStorage.getItem("token");
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(ingredient)
    });
    if (!response.ok) {
      throw new Error('Failed to create ingredient');
    }
    return await response.json();
  }

  async deleteIngredient(id: string): Promise<void> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${this.url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to delete ingredient');
    }
}

  constructor() { 
  }
}
