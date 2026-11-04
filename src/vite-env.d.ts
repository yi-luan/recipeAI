/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the recipeAIService backend, e.g. http://localhost:3001 */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
