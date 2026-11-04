import { isAxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import cookingChefBanner from '../../assets/cookingchef-banner.jpg';
import fallbackDishPhoto from '../../assets/ingredientPhoto.webp';
import { GenerateRecipeRequest } from '../../DataTransfer/Recipe/GenerateRecipeRequest';
import InputDetail from '../../components/inputDetail';
import MultiSelect from '../../components/multiSelect';
import RecipeCards, { RecipeCard } from '../../components/recipeCards';
import { photoApi } from '../../https/photoApi';
import { recipeApi } from '../../https/recipeApi';

type Status = 'idle' | 'loading' | 'success' | 'error';

const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    if (!error.response) return '無法連線到伺服器，請確認後端服務是否已啟動。';
    return `伺服器發生錯誤（${error.response.status}），請稍後再試。`;
  }
  return '生成食譜時發生未預期的錯誤，請稍後再試。';
};

const Content: React.FC = () => {
  const inputDetailRef = useRef<HTMLDivElement>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<RecipeCard[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<GenerateRecipeRequest | null>(
    null
  );

  const handleSearch = (items: string[]) => {
    setSelectedIngredients((prev) => Array.from(new Set([...prev, ...items])));
    inputDetailRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient) ? prev : [...prev, ingredient]
    );
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.filter((item) => item !== ingredient)
    );
  };

  const generateRecipes = async (request: GenerateRecipeRequest) => {
    setLastRequest(request);
    setStatus('loading');
    setErrorMessage(null);
    try {
      const response = await recipeApi.generateRecipe(request);
      const recipeCards = await Promise.all(
        response.map(async (recipe): Promise<RecipeCard> => {
          // A missing photo should not fail the whole result.
          const image = await photoApi
            .getDishPhoto(recipe.dishName)
            .catch(() => fallbackDishPhoto);
          return {
            name: recipe.dishName,
            ingredients: recipe.ingredients.join(', '),
            instructions: recipe.instructions,
            image: image || fallbackDishPhoto,
          };
        })
      );
      setRecipes(recipeCards);
      setStatus('success');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setStatus('error');
    }
  };

  return (
    <div className="flex w-full flex-col gap-6 p-4 sm:gap-8 sm:p-6 lg:p-8">
      <section className="relative flex min-h-56 w-full items-center justify-center overflow-hidden rounded-lg py-10 sm:min-h-72 md:min-h-80 lg:min-h-96">
        <img
          src={cookingChefBanner}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="relative z-10 w-full px-4 text-center text-white sm:px-8">
          <h1 className="mb-4 text-2xl leading-tight font-black tracking-wide sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
            What&apos;s in your kitchen?
          </h1>
          <div className="mx-auto w-full max-w-lg">
            <MultiSelect handleSearch={handleSearch} />
          </div>
        </div>
      </section>

      <section
        ref={inputDetailRef}
        aria-labelledby="input-detail-heading"
        className="scroll-mt-4 rounded-lg bg-white p-4 shadow-[0_-5px_10px_rgba(0,0,0,0.03),0_5px_10px_rgba(0,0,0,0.1)] sm:p-6"
      >
        <InputDetail
          selectedIngredients={selectedIngredients}
          onAddIngredient={handleAddIngredient}
          onRemoveIngredient={handleRemoveIngredient}
          onSubmit={generateRecipes}
          loading={status === 'loading'}
        />
      </section>

      <section
        aria-labelledby="recipes-heading"
        className="rounded-lg bg-white p-4 shadow-lg sm:p-6"
      >
        <RecipeCards
          recipes={recipes}
          status={status}
          errorMessage={errorMessage}
          expectedCount={
            lastRequest
              ? lastRequest.numberOfDishes +
                lastRequest.numberOfSoups +
                (lastRequest.desert ? 1 : 0)
              : 4
          }
          onRetry={
            lastRequest ? () => void generateRecipes(lastRequest) : undefined
          }
        />
      </section>
    </div>
  );
};

export default Content;
