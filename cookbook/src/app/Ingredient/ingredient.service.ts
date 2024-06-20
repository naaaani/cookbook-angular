import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  url = "/api/ingredients";

  async getAllIngredients(): Promise<Ingredient[]> {
    const data = await fetch(this.url);
    return data.json() ?? [];
  }

  async getCategories(): Promise<string[]> {
    const data = await fetch(this.url + "/categories");
    return data.json();
  }

  async createIngredient(ingredient: Ingredient) {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      throw new Error('No token found in local storage');
    }

    console.log(this.parseJwt(token));

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(ingredient)
    });
    if (!response.ok) {
      throw new Error('Failed to create ingredient: ' + response.status + " - " + response.statusText);
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

  parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Invalid token', e);
    return null;
  }
}

constructor() {
}
}
