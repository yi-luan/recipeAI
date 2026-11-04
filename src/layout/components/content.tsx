import { Spin } from 'antd';
import React, { useRef, useState } from 'react';
import cookingChefBanner from '../../assets/cookingchef-banner.jpg';
import InputDetail from '../../components/inputDetail';
import MultiSelect from '../../components/multiSelect';
import RecipeCards, { RecipeCard } from '../../components/recipeCards';

const Content: React.FC = () => {
  const inputDetailRef = useRef<HTMLDivElement>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = React.useState<RecipeCard[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (items: string[]) => {
    setSelectedIngredients(items);
    inputDetailRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.filter((item) => item !== ingredient)
    );
  };

  const handleUpdateRecipes = (recipes: RecipeCard[]) => {
    setRecipes(recipes);
  };

  return (
    <div className="flex h-full w-full flex-col gap-10 sm:p-5 md:p-6 lg:p-8">
      <div className="flex h-full w-full flex-col gap-10 sm:p-6 md:p-8 lg:p-10">
        <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-lg sm:h-64 md:h-80 lg:h-96">
          <img
            src={cookingChefBanner}
            alt="cookingChefBanner"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 px-4 text-center text-white sm:px-6 md:px-8 lg:px-10">
            <h1 className="mb-4 text-2xl leading-tight font-black tracking-wide sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
              What's in your kitchen?
            </h1>
            <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <MultiSelect handleSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={inputDetailRef}
        className="rounded-lg bg-white p-6 shadow-lg"
        style={{
          boxShadow:
            '0 -5px 10px rgba(0, 0, 0, 0.03), 0 5px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <InputDetail
          selectedIngredients={selectedIngredients}
          onRemoveIngredient={handleRemoveIngredient}
          onUpdateRecipes={handleUpdateRecipes}
          setLoading={setLoading}
        />
      </div>

      <div className="rounded-lg bg-white p-5 shadow-lg">
        <RecipeCards recipes={recipes} />
      </div>
      <div className="p-1"></div>

      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default Content;
