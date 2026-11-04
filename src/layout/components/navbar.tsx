import React from 'react';
import logo from '../../assets/RecipeAI-logo.png';

const Navbar: React.FC = () => {
  return (
    <header className="flex w-full items-center justify-center border-b border-gray-100 bg-white p-3 sm:rounded-t-lg sm:p-4">
      <a href="/" aria-label="RecipeAI 首頁">
        <img src={logo} alt="RecipeAI" className="h-16 w-auto sm:h-[90px]" />
      </a>
    </header>
  );
};

export default Navbar;
