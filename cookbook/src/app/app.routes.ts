import { Routes } from '@angular/router';
import { IngredientListComponent } from './Ingredient/ingredient-list/ingredient-list.component';
import { RegistrationFormComponent } from './Authentication/registration-form/registration-form.component';
import { LoginFormComponent } from './Authentication/login-form/login-form.component';
import { RecipeDetailsComponent } from './Recipe/recipe-details/recipe-details.component';


export const routes: Routes = [
    { path: "ingredients", component: IngredientListComponent },
    { path: "registration", component: RegistrationFormComponent },
    { path: "login", component: LoginFormComponent },
    { path: "recipe/:id", component: RecipeDetailsComponent}
];
