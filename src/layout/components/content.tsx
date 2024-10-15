import React, { useRef, useState } from 'react';
import cookingChefBanner from '../../assets/cookingchef-banner.jpg';
import InputDetail from '../../components/inputDetail';
import MultiSelect from '../../components/multiSelect';
import RecipeCards from '../../components/recipeCards';

const Content: React.FC = () => {
  const inputDetailRef = useRef<HTMLDivElement>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleSearch = (items: string[]) => {
    setSelectedIngredients(items);
    inputDetailRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.filter((item) => item !== ingredient)
    );
  };

  return (
    <div className="flex flex-col w-full h-full gap-10 p-10">
      <div className="relative h-full flex justify-center items-center rounded-lg">
        <img
          src={cookingChefBanner}
          alt="Placeholder Image"
          className="object-cover h-full w-full rounded-lg"
        />
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="absolute text-white text-3xl font-bold ">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[0.1em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[0.1em] text-center mb-4">
            What's in your kitchen?
          </h1>
          <label className="flex flex-col h-14 w-full max-w-[480px] @[480px]:h-16">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <MultiSelect handleSearch={handleSearch} />
            </div>
          </label>
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
        />
      </div>

      <div className="bg-white p-5 rounded-lg shadow-lg">
        <RecipeCards />
      </div>
      <div className="p-1"></div>
    </div>
  );
};

export default Content;
