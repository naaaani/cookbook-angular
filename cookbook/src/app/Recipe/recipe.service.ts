import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  url = '/api/recipes';
  errorMessage: string = 'Network response was not ok'


  getAllRecipes() {
    return this.dataService.fetchData(async () => {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(this.errorMessage);
      }
      return response.json() as Promise<Recipe[]>;
    });
  }

  getRecipe(id: number){
    return this.dataService.fetchData(async () => {
      const response = await fetch(this.url + '/' + (id));
      if (!response.ok) {
        throw new Error(this.errorMessage);
      }
      return response.json() as Promise<Recipe>;
    });
  }

  getRecipesByUserId(userId: string) {
    return this.dataService.fetchData(async () => {
      const response = await fetch(`${this.url}/user/${userId}`);
      if (!response.ok) {
        throw new Error(this.errorMessage);
      }
      return response.json() as Promise<Recipe[]>;
    })
  }

  postRecipe(recipe: FormData) {
    const token = localStorage.getItem("token");
    return this.dataService.fetchData(async () => {
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: recipe
      });
      if (!response.ok) {
        throw new Error(this.errorMessage);
      }
      return response.json();
    });
  }

  constructor(private dataService: DataService) { }

}
