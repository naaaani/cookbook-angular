import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { IngredientService } from '../../Ingredient/ingredient.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.css',
})
export class IngredientFormComponent implements OnInit {
  ingredientForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ingredientService: IngredientService,
    private router: Router 
  ) {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      unitOfMeasure: ['', Validators.required],
      isGlutenFree: [false],
      isDairyFree: [false],
      isMeatFree: [false],
      isEggFree: [false],
    });
  }

  ngOnInit(): void {}

  async submit(): Promise<void> {
    if (this.ingredientForm.valid) {
      const ingredient = this.ingredientForm.value;

      try {
        await this.ingredientService.createIngredient(ingredient);
        this.ingredientForm.reset();
        this.router.navigate(['/ingredients']);
      } catch (error) {
        console.error('Error creating ingredient:', error);
      }
    } else {
      console.log('Form is invalid');
      this.ingredientForm.markAllAsTouched();
    }
  }


  
}