import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  url = "/api/recipes";


  async getAllRecipes(): Promise<Recipe[]> {
    const data = await fetch(this.url);
    console.log(data);
    
    return data.json() ?? [];
  }

  async getRecipe(id: number): Promise<Recipe> {
    const data = await fetch(this.url + '/' + (id));
    console.log(data);

    return data.json() ?? [];
  }

  async getRecipesByUserId(userId: string): Promise<Recipe[]> {
    try {
      const response = await fetch(`${this.url}/user/${userId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      return response.json() as Promise<Recipe[]>;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw new Error('Failed to fetch recipes');
    }
  }

  async postRecipe(recipe: FormData) {
    console.log("recipe: " + JSON.stringify(recipe));
    const token = localStorage.getItem("token");
    
    fetch(this.url, {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${token}`,
      },
      body: recipe  
    }).then(res =>{
      if (!res.ok) {
        console.error(res.statusText);
        throw new Error()
      } else {
        console.log("Posted new recipe");
        return res.json();
      }
    });
  }

  constructor() { }
  
}