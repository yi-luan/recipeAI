import { GenerateRecipeRequest } from '../DataTransfer/Recipe/GenerateRecipeRequest';
import axiosInstance from './axiosInstance';

export const recipeApi = {
  generateRecipe: (request: GenerateRecipeRequest) =>
    axiosInstance.post('/recipe/generateRecipe', request),
};
