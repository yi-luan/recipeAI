import { GenerateRecipeRequest } from '../DataTransfer/Recipe/GenerateRecipeRequest';
import {
  GenerateRecipeResponse,
  GenerateRecipeResult,
  MenuShortfall,
} from '../DataTransfer/Recipe/GenerateRecipeResponse';
import { recipeAxiosInstance } from './axiosInstance';

// Go 服務以 CORS Access-Control-Expose-Headers 公開的回應 header（axios 會轉成小寫）
const HEADER_SHORTFALL = 'x-menu-shortfall';
const HEADER_DEGRADED = 'x-retrieval-degraded';
const HEADER_MODE = 'x-retrieval-mode';

const readHeader = (headers: unknown, name: string): string | undefined => {
  if (!headers || typeof headers !== 'object') return undefined;
  const value = (headers as Record<string, unknown>)[name];
  return typeof value === 'string' && value.trim() !== ''
    ? value.trim()
    : undefined;
};

/** 解析 `X-Menu-Shortfall`，例如 "dish=1,soup=1" → { dish: 1, soup: 1 }；格式不對的片段直接略過。 */
export const parseShortfall = (value: string | undefined): MenuShortfall => {
  const shortfall: MenuShortfall = {};
  if (!value) return shortfall;
  for (const part of value.split(',')) {
    const [key, rawCount] = part.split('=').map((s) => s.trim());
    const count = Number(rawCount);
    if (key && Number.isInteger(count) && count > 0) {
      shortfall[key] = (shortfall[key] ?? 0) + count;
    }
  }
  return shortfall;
};

export const recipeApi = {
  generateRecipe: async (
    request: GenerateRecipeRequest
  ): Promise<GenerateRecipeResult> => {
    const response = await recipeAxiosInstance.post<GenerateRecipeResponse[]>(
      '/recipe/generateRecipe',
      request
    );
    return {
      recipes: Array.isArray(response.data) ? response.data : [],
      shortfall: parseShortfall(readHeader(response.headers, HEADER_SHORTFALL)),
      degraded:
        readHeader(response.headers, HEADER_DEGRADED)?.toLowerCase() === 'true',
      mode: readHeader(response.headers, HEADER_MODE),
    };
  },
};
