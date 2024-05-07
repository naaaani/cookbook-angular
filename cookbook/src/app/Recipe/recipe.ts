import { Ingredient } from "../Ingredient/ingredient"

export interface Recipe {
    id ? : number
    ingredients	 : [Ingredient]
    name : string
    description	: string
    isVegan	: boolean
    isVegetarian : boolean
    isGlutenFree : boolean
    isDairyFree : boolean
}