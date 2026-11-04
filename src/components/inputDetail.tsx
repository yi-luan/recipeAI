import clsx from 'clsx';
import React from 'react';
import { GenerateRecipeRequest } from '../DataTransfer/Recipe/GenerateRecipeRequest';
import { photoApi } from '../https/photoApi';
import { recipeApi } from '../https/recipeApi';
import { RecipeCard } from './recipeCards';
interface InputDetailProps {
  selectedIngredients: string[];
  onRemoveIngredient: (ingredient: string) => void;
  onUpdateRecipes: (recipes: RecipeCard[]) => void;
  setLoading: (loading: boolean) => void;
}

const InputDetail: React.FC<InputDetailProps> = ({
  selectedIngredients,
  onRemoveIngredient,
  onUpdateRecipes,
  setLoading,
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const [type, setType] = React.useState('西式');
  const [numberOfDishes, setNumberOfDishes] = React.useState(4);
  const [numberOfSoups, setNumberOfSoups] = React.useState(1);
  const [needDessert, setNeedDessert] = React.useState(true);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      selectedIngredients.push(inputValue.trim());
      setInputValue('');
    }
  };

  const generateRecipe = async () => {
    setLoading(true);
    const request: GenerateRecipeRequest = {
      ingredients: selectedIngredients.join(' '),
      type: type,
      numberOfDishes: numberOfDishes,
      numberOfSoups: numberOfSoups,
      desert: needDessert,
    };
    const response = await recipeApi.generateRecipe(request);
    const recipeCards = await Promise.all(
      response.map(async (recipe) => {
        const photoUrl = await photoApi.getDishPhoto(recipe.dishName);
        return {
          name: recipe.dishName,
          ingredients: recipe.ingredients.join(', '),
          instructions: recipe.instructions,
          image: photoUrl,
        } as RecipeCard;
      })
    );
    onUpdateRecipes(recipeCards);
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-5 text-lg font-bold text-[#1b130d]">填寫詳細資料</div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-[#9a6e4c]">
            食材
          </label>
          <div
            className={clsx(
              'flex flex-wrap gap-2',
              selectedIngredients.length > 0 && 'mb-2'
            )}
          >
            {selectedIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-[#e7dacf] px-2 py-1 text-sm text-[#1b130d]"
              >
                {ingredient}
                <button
                  onClick={() => onRemoveIngredient(ingredient)}
                  className="ml-1 text-[#9a6e4c] hover:text-[#1b130d]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="relative flex w-full items-center">
            <input
              className="form-input w-full rounded-xl border border-[#e7dacf] p-2 text-sm focus:border-[#ee7f2b] focus:ring-[#ee7f2b]"
              placeholder="輸入食材"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ position: 'relative', zIndex: 1 }}
            />
            <button
              onClick={() => {
                if (inputValue.trim() !== '') {
                  selectedIngredients.push(inputValue.trim());
                  setInputValue('');
                }
              }}
              className="absolute right-0 rounded-full text-base font-bold text-[#ee7f2b]"
              style={{
                position: 'absolute',
                zIndex: 2,
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                fontSize: '1.5rem', // 增加字體大小
                padding: '0.5rem 1rem', // 增加padding
                width: 'auto', // 自適應寬度
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-[#9a6e4c]">
            菜系類型
          </label>
          <select
            className="form-select w-full rounded-xl border border-[#e7dacf] p-2 text-sm focus:border-[#ee7f2b] focus:ring-[#ee7f2b]"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="西式">西式</option>
            <option value="中式">中式</option>
            <option value="日式">日式</option>
            <option value="韓式">韓式</option>
            <option value="義式">義式</option>
            <option value="印度">印度</option>
            <option value="泰式">泰式</option>
            <option value="越式">越式</option>
            <option value="墨西哥">墨西哥</option>
            <option value="巴西">巴西</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-[#9a6e4c]">
            菜餚數量
          </label>
          <input
            type="number"
            className="form-input w-full rounded-xl border border-[#e7dacf] p-2 text-sm focus:border-[#ee7f2b] focus:ring-[#ee7f2b]"
            placeholder="輸入菜餚數量"
            value={numberOfDishes}
            onChange={(e) => setNumberOfDishes(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-[#9a6e4c]">
            湯品數量
          </label>
          <input
            type="number"
            className="form-input w-full rounded-xl border border-[#e7dacf] p-2 text-sm focus:border-[#ee7f2b] focus:ring-[#ee7f2b]"
            placeholder="輸入湯品數量"
            value={numberOfSoups}
            onChange={(e) => setNumberOfSoups(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-[#9a6e4c]">
            需要甜點嗎？
          </label>
          <select
            className="form-select w-full rounded-xl border border-[#e7dacf] p-2 text-sm focus:border-[#ee7f2b] focus:ring-[#ee7f2b]"
            onChange={(e) => setNeedDessert(e.target.value === '是')}
          >
            <option>是</option>
            <option>否</option>
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          className="rounded-full bg-[#ee7f2b] px-4 py-2 font-bold text-[#1b130d] transition duration-300 hover:bg-[#f19a55]"
          onClick={generateRecipe}
        >
          生成食譜
        </button>
      </div>
    </div>
  );
};

export default InputDetail;
