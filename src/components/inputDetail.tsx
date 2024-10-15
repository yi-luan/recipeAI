import clsx from 'clsx';
import React from 'react';
import { GenerateRecipeRequest } from '../DataTransfer/Recipe/GenerateRecipeRequest';
import { recipeApi } from '../https/recipeApi';
interface InputDetailProps {
  selectedIngredients: string[];
  onRemoveIngredient: (ingredient: string) => void;
}

const InputDetail: React.FC<InputDetailProps> = ({
  selectedIngredients,
  onRemoveIngredient,
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
    const request: GenerateRecipeRequest = {
      ingredients: selectedIngredients.join(' '),
      type: type,
      numberOfDishes: numberOfDishes,
      numberOfSoups: numberOfSoups,
      desert: needDessert,
    };
    const response = await recipeApi.generateRecipe(request);
    console.log(response);
  };

  return (
    <div>
      <div className="text-[#1b130d] font-bold mb-5 text-lg">填寫詳細資料</div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="mb-5">
          <label className="block text-sm font-medium text-[#9a6e4c] mb-2">
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
                className="inline-flex items-center bg-[#e7dacf] text-[#1b130d] rounded-full px-2 py-1 text-sm"
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
          <input
            className="form-input w-full rounded-xl border border-[#e7dacf] p-2 text-sm focus:border-[#ee7f2b] focus:ring-[#ee7f2b]"
            placeholder="輸入食材"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-[#9a6e4c] mb-2">
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
          <label className="block text-sm font-medium text-[#9a6e4c] mb-2">
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
          <label className="block text-sm font-medium text-[#9a6e4c] mb-2">
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
          <label className="block text-sm font-medium text-[#9a6e4c] mb-2">
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
      <div className="flex justify-center mt-6">
        <button
          className="bg-[#ee7f2b] text-[#1b130d] font-bold py-2 px-4 rounded-full hover:bg-[#f19a55] transition duration-300"
          onClick={generateRecipe}
        >
          生成食譜
        </button>
      </div>
    </div>
  );
};

export default InputDetail;
