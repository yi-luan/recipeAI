# RecipeAI

輸入冰箱裡現有的食材，選好菜系和道數，AI 就會設計一套只用這些食材的食譜。

這個 repo 是前端，後端在 [recipeAIService](https://github.com/yi-luan/recipeAIService)。

線上版本：https://recipe-ai-gray.vercel.app

![RecipeAI 畫面](docs/screenshot.jpg)

<sub>截圖中的食譜是示範資料。</sub>

`React 19` · `TypeScript 6` · `Vite 8` · `Ant Design 6` · `Tailwind CSS 4`

## 功能

- 用 Enter 或「+」把食材一個個加成標籤；標題列的搜尋框也能一次輸入多個食材
- 可以選菜系，以及菜、湯的數量、要不要甜點
- 每道菜都有食材清單和步驟，並自動配上菜色照片；找不到照片時改用預設圖
- 載入中、沒有結果、發生錯誤時各有對應的畫面。錯誤畫面可以一鍵重試，也會分辨是「後端連不上」還是「伺服器回傳錯誤」
- 支援手機版排版，可以用鍵盤操作

## 架構

```
src/
  layout/              頁面骨架（navbar、content）
  components/          食材輸入、標籤選擇、食譜卡片
  https/               axios 實例與 API 呼叫（recipeApi、photoApi）
  DataTransfer/        前後端共用的請求／回應型別
  theme.ts             Ant Design 主題
```

`layout/components/content.tsx` 用明確的狀態（idle → loading → success / error）管理整個請求流程，避免請求失敗時畫面一直卡在載入中。

## 開始使用

```bash
cp .env.example .env   # 需要時修改 VITE_API_BASE_URL
npm install
npm run dev            # http://localhost:5173
```

需要同時啟動 [recipeAIService](https://github.com/yi-luan/recipeAIService)（預設 `http://localhost:3001`）。

| 變數                | 預設值                  | 說明         |
| ------------------- | ----------------------- | ------------ |
| `VITE_API_BASE_URL` | `http://localhost:3001` | 後端服務網址 |

## 指令

| 指令                                | 說明                 |
| ----------------------------------- | -------------------- |
| `npm run dev`                       | 啟動開發伺服器       |
| `npm run build`                     | 型別檢查並建置正式版 |
| `npm run lint` / `npm run lint:fix` | ESLint               |
| `npm run format`                    | Prettier 格式化      |
