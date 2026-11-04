import React, { KeyboardEvent, useState } from 'react';

interface MultiSelectProps {
  handleSearch: (items: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ handleSearch }) => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addItem = (value: string) => {
    const trimmed = value.trim();
    if (trimmed === '' || items.includes(trimmed)) return items;
    const next = [...items, trimmed];
    setItems(next);
    return next;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Ignore Enter while an IME (e.g. Zhuyin) is composing a word.
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault();
      addItem(inputValue);
      setInputValue('');
    } else if (
      event.key === 'Backspace' &&
      inputValue === '' &&
      items.length > 0
    ) {
      setItems(items.slice(0, -1));
    }
  };

  const removeItem = (text: string) => {
    setItems(items.filter((item) => item !== text));
  };

  const submit = () => {
    // Include whatever is still in the text box so a click on Search
    // doesn't silently drop the last ingredient.
    const next = addItem(inputValue);
    setInputValue('');
    handleSearch(next);
  };

  return (
    <div
      role="search"
      className="flex w-full items-stretch overflow-hidden rounded-xl border border-[#e7dacf] bg-[#fcfaf8] text-left focus-within:ring-2 focus-within:ring-[#ee7f2b]/60"
    >
      <div
        className="flex shrink-0 items-center justify-center pr-2 pl-4 text-[#9a6e4c]"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
      </div>
      <div className="custom-scrollbar flex min-w-0 flex-1 items-center overflow-x-auto py-2">
        {items.map((item) => (
          <span
            key={item}
            className="mr-1 inline-flex shrink-0 items-center rounded-full bg-[#e7dacf] py-1 pr-1 pl-3 text-sm text-[#1b130d]"
          >
            {item}
            <button
              type="button"
              onClick={() => removeItem(item)}
              aria-label={`移除 ${item}`}
              className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-[#9a6e4c] hover:bg-[#d9c8ba] hover:text-[#1b130d]"
            >
              ×
            </button>
          </span>
        ))}
        <input
          aria-label="輸入食材，按 Enter 加入"
          placeholder={items.length === 0 ? 'Enter ingredients' : ''}
          className="h-full min-w-[80px] flex-1 bg-transparent px-2 text-sm text-[#1b130d] placeholder:text-[#9a6e4c] focus:outline-hidden sm:text-base"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        type="button"
        className="shrink-0 bg-[#ee7f2b] px-4 text-sm font-bold text-[#1b130d] transition-colors hover:bg-[#f19a55] sm:px-5 sm:text-base"
        onClick={submit}
      >
        Search
      </button>
    </div>
  );
};

export default MultiSelect;
