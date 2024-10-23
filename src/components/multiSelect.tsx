import React, { KeyboardEvent, useState } from 'react';

interface MultiSelectProps {
  handleSearch: (items: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ handleSearch }) => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setItems([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeItem = (
    event: React.MouseEvent<HTMLButtonElement>,
    text: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setItems(items.filter((item) => item !== text));
  };

  return (
    <div className="multi-select w-full">
      <div className="flex w-full items-stretch rounded-xl h-full relative">
        <div
          className="text-[#9a6e4c] flex-shrink-0 flex border border-[#e7dacf] bg-[#fcfaf8] items-center justify-center pl-[15px] rounded-l-xl border-r-0 pr-4"
          data-icon="MagnifyingGlass"
          data-size="20px"
          data-weight="regular"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
        <div className="flex-1 flex items-center border border-[#e7dacf] bg-[#fcfaf8] p-3 rounded-xl rounded-l-none rounded-r-none overflow-x-auto overflow-y-hidden  scrollbar-thin scrollbar-thumb-[#ee7f2b] scrollbar-track-white scroll-smooth custom-scrollbar">
          {items.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-[#e7dacf] text-[#1b130d] rounded-full px-2 py-1 text-sm mr-1 my-1 flex-shrink-0 scrollbar-thin"
            >
              {item}
              <button
                onClick={(e) => removeItem(e, item)}
                className="ml-1 text-[#9a6e4c] hover:text-[#1b130d]"
              >
                ×
              </button>
            </span>
          ))}
          <input
            placeholder={'Enter ingredients, recipes, or cuisines'}
            className="flex-1 min-w-[50px] bg-transparent text-[#1b130d] focus:outline-none h-full placeholder:text-[#9a6e4c] px-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex-shrink-0 flex items-center justify-center rounded-r-xl border-l-0 border border-[#e7dacf] bg-[#fcfaf8] pr-[1px]">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-r-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#ee7f2b] text-[#1b130d] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
            onClick={() => handleSearch(items)}
          >
            <span className="truncate">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
