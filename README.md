# RecipeAI (frontend)

React + TypeScript + Vite frontend for RecipeAI. It talks to the
[recipeAIService](https://github.com/yi-luan/recipeAIService) backend.

## Getting started

```bash
cp .env.example .env   # then edit VITE_API_BASE_URL if needed
npm install
npm run dev
```

| Variable            | Default                 | Description                     |
| ------------------- | ----------------------- | ------------------------------- |
| `VITE_API_BASE_URL` | `http://localhost:3001` | Base URL of the backend service |

## Scripts

- `npm run dev` – start the dev server
- `npm run build` – type-check and build for production
- `npm run lint` / `npm run lint:fix` – run ESLint
- `npm run format` – format with Prettier
