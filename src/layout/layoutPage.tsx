import React from 'react';
import Content from './components/content';
import Navbar from './components/navbar';

const LayoutPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#fcfaf7] sm:py-6">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col bg-white shadow-md sm:min-h-0 sm:w-11/12 sm:rounded-lg">
        <Navbar />
        <main className="w-full">
          <Content />
        </main>
      </div>
    </div>
  );
};

export default LayoutPage;
