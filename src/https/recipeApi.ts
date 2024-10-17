import { GenerateRecipeRequest } from '../DataTransfer/Recipe/GenerateRecipeRequest';
import { GenerateRecipeResponse } from '../DataTransfer/Recipe/GenerateRecipeResponse';
import axiosInstance from './axiosInstance';

export const recipeApi = {
  generateRecipe: (
    request: GenerateRecipeRequest
  ): Promise<GenerateRecipeResponse[]> =>
    axiosInstance.post('/recipe/generateRecipe', request),
};
