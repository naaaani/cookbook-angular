import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent {
  @Input() id?: number;
  @Input() name? : string;
  @Input() unitOfMeasure?: string;
  @Input() isGlutenFree?: boolean;
  @Input() isDairyFree?: boolean;
  @Input() isMeatFree?: boolean;
  @Input() isEggFree?: boolean; 
}
