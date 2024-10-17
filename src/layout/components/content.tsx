import CircularProgress from '@mui/material/CircularProgress';
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
    <div className="flex flex-col w-full h-full gap-10 p-10">
      <div className="flex flex-col w-full h-full gap-10 sm:p-6 md:p-8 lg:p-10">
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 flex justify-center items-center rounded-lg overflow-hidden">
          <img
            src={cookingChefBanner}
            alt="cookingChefBanner"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white text-center px-4 sm:px-6 md:px-8 lg:px-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-wide mb-4 sm:mb-6">
              What's in your kitchen?
            </h1>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
              <MultiSelect handleSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={inputDetailRef}
        className="bg-white p-6 rounded-lg shadow-lg"
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

      <div className="bg-white p-5 rounded-lg shadow-lg">
        <RecipeCards recipes={recipes} />
      </div>
      <div className="p-1"></div>

      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <CircularProgress
            size={60}
            thickness={5}
            style={{ color: '#ee7f2b' }}
          />
        </div>
      )}
    </div>
  );
};

export default Content;
