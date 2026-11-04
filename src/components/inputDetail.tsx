import { Button } from 'antd';
import clsx from 'clsx';
import React, { useState } from 'react';
import { GenerateRecipeRequest } from '../DataTransfer/Recipe/GenerateRecipeRequest';

interface InputDetailProps {
  selectedIngredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
  onSubmit: (request: GenerateRecipeRequest) => void;
  loading: boolean;
}

const CUISINE_TYPES = [
  '西式',
  '中式',
  '日式',
  '韓式',
  '義式',
  '印度',
  '泰式',
  '越式',
  '墨西哥',
  '巴西',
];

const MAX_DISHES = 10;
const MAX_SOUPS = 5;

const labelClass = 'mb-2 block text-sm font-medium text-[#9a6e4c]';
const fieldClass =
  'w-full rounded-xl border border-[#e7dacf] bg-white p-2 text-sm text-[#1b130d] transition-colors focus:border-[#ee7f2b] focus:ring-2 focus:ring-[#ee7f2b]/30 focus:outline-hidden disabled:cursor-not-allowed disabled:bg-[#fcfaf8]';

const clamp = (value: number, min: number, max: number) =>
  Number.isNaN(value) ? min : Math.min(Math.max(value, min), max);

const InputDetail: React.FC<InputDetailProps> = ({
  selectedIngredients,
  onAddIngredient,
  onRemoveIngredient,
  onSubmit,
  loading,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [type, setType] = useState(CUISINE_TYPES[0]);
  const [numberOfDishes, setNumberOfDishes] = useState(4);
  const [numberOfSoups, setNumberOfSoups] = useState(1);
  const [needDessert, setNeedDessert] = useState(true);
  const [showIngredientHint, setShowIngredientHint] = useState(false);

  const addIngredient = () => {
    const value = inputValue.trim();
    if (value === '') return;
    onAddIngredient(value);
    setInputValue('');
    setShowIngredientHint(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Ignore Enter while an IME (e.g. Zhuyin) is composing a word.
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault();
      addIngredient();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedIngredients.length === 0) {
      setShowIngredientHint(true);
      return;
    }
    onSubmit({
      ingredients: selectedIngredients.join(' '),
      type,
      numberOfDishes,
      numberOfSoups,
      desert: needDessert,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2
        id="input-detail-heading"
        className="mb-5 text-lg font-bold text-[#1b130d]"
      >
        填寫詳細資料
      </h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <div>
          <label htmlFor="ingredient-input" className={labelClass}>
            食材
          </label>
          {selectedIngredients.length > 0 && (
            <ul className="mb-2 flex flex-wrap gap-2" aria-label="已選食材">
              {selectedIngredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="inline-flex items-center rounded-full bg-[#e7dacf] py-1 pr-1 pl-3 text-sm text-[#1b130d]"
                >
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => onRemoveIngredient(ingredient)}
                    aria-label={`移除 ${ingredient}`}
                    className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-[#9a6e4c] hover:bg-[#d9c8ba] hover:text-[#1b130d]"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="relative">
            <input
              id="ingredient-input"
              className={clsx(
                fieldClass,
                'pr-12',
                showIngredientHint && 'border-red-400'
              )}
              placeholder="輸入食材後按 Enter"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-invalid={showIngredientHint}
              aria-describedby={
                showIngredientHint ? 'ingredient-hint' : undefined
              }
            />
            <button
              type="button"
              onClick={addIngredient}
              aria-label="加入食材"
              className="absolute top-1/2 right-1 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-2xl leading-none font-bold text-[#ee7f2b] hover:bg-[#fcfaf8]"
            >
              +
            </button>
          </div>
          {showIngredientHint && (
            <p
              id="ingredient-hint"
              role="alert"
              className="mt-1 text-sm text-red-600"
            >
              請至少加入一項食材。
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cuisine-type" className={labelClass}>
            菜系類型
          </label>
          <select
            id="cuisine-type"
            className={fieldClass}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {CUISINE_TYPES.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="number-of-dishes" className={labelClass}>
            菜餚數量
          </label>
          <input
            id="number-of-dishes"
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_DISHES}
            className={fieldClass}
            value={numberOfDishes}
            onChange={(e) =>
              setNumberOfDishes(clamp(parseInt(e.target.value), 1, MAX_DISHES))
            }
          />
        </div>

        <div>
          <label htmlFor="number-of-soups" className={labelClass}>
            湯品數量
          </label>
          <input
            id="number-of-soups"
            type="number"
            inputMode="numeric"
            min={0}
            max={MAX_SOUPS}
            className={fieldClass}
            value={numberOfSoups}
            onChange={(e) =>
              setNumberOfSoups(clamp(parseInt(e.target.value), 0, MAX_SOUPS))
            }
          />
        </div>

        <div>
          <label htmlFor="need-dessert" className={labelClass}>
            需要甜點嗎？
          </label>
          <select
            id="need-dessert"
            className={fieldClass}
            value={needDessert ? 'yes' : 'no'}
            onChange={(e) => setNeedDessert(e.target.value === 'yes')}
          >
            <option value="yes">是</option>
            <option value="no">否</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          type="primary"
          htmlType="submit"
          shape="round"
          size="large"
          loading={loading}
          className="px-8 font-bold"
        >
          {loading ? '生成中…' : '生成食譜'}
        </Button>
      </div>
    </form>
  );
};

export default InputDetail;
