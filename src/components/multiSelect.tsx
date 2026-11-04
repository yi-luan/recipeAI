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
      <div className="relative flex h-full w-full items-stretch rounded-xl">
        <div
          className="flex shrink-0 items-center justify-center rounded-l-xl border border-r-0 border-[#e7dacf] bg-[#fcfaf8] pr-4 pl-[15px] text-[#9a6e4c]"
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
        <div className="custom-scrollbar flex flex-1 scrollbar-thin scrollbar-thumb-[#ee7f2b] scrollbar-track-white items-center overflow-x-auto overflow-y-hidden scroll-smooth rounded-xl rounded-l-none rounded-r-none border border-[#e7dacf] bg-[#fcfaf8] p-3">
          {items.map((item, index) => (
            <span
              key={index}
              className="my-1 mr-1 inline-flex shrink-0 scrollbar-thin items-center rounded-full bg-[#e7dacf] px-2 py-1 text-sm text-[#1b130d]"
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
            className="h-full min-w-[50px] flex-1 bg-transparent px-2 text-sm leading-normal font-normal text-[#1b130d] placeholder:text-[#9a6e4c] focus:outline-hidden @[480px]:text-base @[480px]:leading-normal @[480px]:font-normal"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex shrink-0 items-center justify-center rounded-r-xl border border-l-0 border-[#e7dacf] bg-[#fcfaf8] pr-[1px]">
          <button
            className="flex h-10 max-w-[480px] min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-r-xl bg-[#ee7f2b] px-4 text-sm leading-normal font-bold tracking-[0.015em] text-[#1b130d] @[480px]:h-12 @[480px]:px-5 @[480px]:text-base @[480px]:leading-normal @[480px]:font-bold @[480px]:tracking-[0.015em]"
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
