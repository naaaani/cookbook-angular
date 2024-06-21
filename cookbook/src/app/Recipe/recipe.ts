export interface Recipe {
    id?: number
    ingredients: [{ ingredient: string , amount: string}]
    name: string
    description: string
    createdBy: string
    vegan: boolean
    vegetarian: boolean
    glutenFree: boolean
    dairyFree: boolean
    containsTreeNuts: boolean
    imageUrl: string
}
