/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Node 後端（recipeAIService）網址，照片 API 使用，例如 http://localhost:3001 */
  readonly VITE_API_BASE_URL?: string;
  /** Go 檢索服務（recipeCrawler）網址，食譜 API 使用，例如 http://localhost:8080 */
  readonly VITE_RECIPE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
