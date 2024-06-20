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

// {
//     "id": 1,
//     "ingredients": [
//         {
//             "ingredient": "Flour",
//             "amount": "300 g"
//         }
//     ],
//     "name": "Vegan Pizza",
//     "description": "Delicious vegan pizza recipe",
//     "createdBy": "admin",
//     "vegan": true,
//     "vegetarian": true,
//     "dairyFree": true,
//     "glutenFree": true,
//     "containsTreeNuts": false,
//     "imageUrl": "/api/recipes/1/image"