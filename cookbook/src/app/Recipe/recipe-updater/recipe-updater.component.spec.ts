import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeUpdaterComponent } from './recipe-updater.component';

describe('RecipeUpdaterComponent', () => {
  let component: RecipeUpdaterComponent;
  let fixture: ComponentFixture<RecipeUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeUpdaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
