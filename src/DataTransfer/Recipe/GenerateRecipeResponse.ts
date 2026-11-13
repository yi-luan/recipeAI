/**
 * 一道菜。前三個欄位與舊的 Node 後端相同；其餘為 Go 檢索服務新增的選填欄位，
 * 不存在時畫面維持原樣。
 */
export interface GenerateRecipeResponse {
  dishName: string;
  ingredients: string[];
  instructions: string[];
  /** dish、soup、dessert */
  category?: string;
  /** 原始食譜網址；純生成的菜沒有 */
  sourceUrl?: string;
  /** 純 AI 生成、沒有真實食譜來源 */
  generated?: boolean;
  /** 使用者沒有的食材 */
  missingIngredients?: string[];
  /** 缺少食材 → 替代建議 */
  substitutions?: Record<string, string>;
  /** 食材 → 備註，例如「需另外準備」 */
  ingredientNotes?: Record<string, string>;
  /** 步驟備註，例如「步驟請見原文」；此時 instructions 為空陣列 */
  instructionsNote?: string;
}

/** 少了哪幾類菜、各幾道，例如 { dish: 1, soup: 1 }。 */
export type MenuShortfall = Record<string, number>;

/** recipeApi.generateRecipe 的結果：回應本體加上從回應 header 讀出的資訊。 */
export interface GenerateRecipeResult {
  recipes: GenerateRecipeResponse[];
  /** 來自 `X-Menu-Shortfall`：真實食譜不足且補齊失敗時少的道數 */
  shortfall: MenuShortfall;
  /** 來自 `X-Retrieval-Degraded`：搜尋服務故障、改用純生成 */
  degraded: boolean;
  /** 來自 `X-Retrieval-Mode`（Strict、Relaxed、None、Degraded） */
  mode?: string;
}
