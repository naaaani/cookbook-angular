import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngredientService } from '../../Ingredient/ingredient.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.css',
})
export class IngredientFormComponent implements OnInit {
  ingredientForm: FormGroup;
  categories: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ingredientService: IngredientService,
    private router: Router
  ) {
    this.ingredientForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      category: ['', Validators.required],
      approved: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    const ingredientCategories = this.ingredientService.getCategories();
    ingredientCategories.then(categories => this.categories = categories);
  }

  submit(): void {
    if (this.ingredientForm.valid) {
      const ingredient = this.ingredientForm.value;
      console.log(ingredient);
      
        this.ingredientService.createIngredient(ingredient)
          .then(response => {
            if (response.ok) {
              this.ingredientForm.reset();
              this.router.navigate(['/ingredients']);
            } else {
              console.error('Error creating ingredient:', response.statusText);
            }
          });
    } else {
      console.log('Form is invalid');
      this.ingredientForm.markAllAsTouched();
    }
  }



}