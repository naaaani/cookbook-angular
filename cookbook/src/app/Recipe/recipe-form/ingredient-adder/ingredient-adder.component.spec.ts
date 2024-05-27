import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientAdderComponent } from './ingredient-adder.component';

describe('IngredientAdderComponent', () => {
  let component: IngredientAdderComponent;
  let fixture: ComponentFixture<IngredientAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientAdderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
