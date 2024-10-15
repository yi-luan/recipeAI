export interface GenerateRecipeRequest {
  ingredients: string;
  type: string;
  numberOfDishes: number;
  numberOfSoups: number;
  desert: boolean;
}
