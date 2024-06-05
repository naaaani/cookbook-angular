import { Ingredient } from "../Ingredient/ingredient"

export interface Recipe {
    id ? : number
    ingredients	 : [{ ingredient : Ingredient, amount : number}]
    name : string
    description	: string
    isVegan	: boolean
    isVegetarian : boolean
    isGlutenFree : boolean
    isDairyFree : boolean
    imageUrl: string
}