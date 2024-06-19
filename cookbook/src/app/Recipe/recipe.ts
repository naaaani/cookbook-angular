export interface Recipe {
    id?: number
    ingredients: [{ ingredient: string , amount: string}]
    name: string
    description: string
    createdBy: string
    isVegan: boolean
    isVegetarian: boolean
    isGlutenFree: boolean
    isDairyFree: boolean
    containsTreeNuts: boolean
    imageUrl: string
}