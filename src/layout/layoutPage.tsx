import React from 'react';
import Content from './components/content';
import Navbar from './components/navbar';

const LayoutPage: React.FC = () => {
  return (
    <div
      style={{ backgroundColor: '#FCFAF7' }}
      className="w-full m-auto h-screen flex justify-center items-center"
    >
      <div className="bg-white w-11/12 mx-auto shadow-md rounded-lg flex flex-col h-full">
        <Navbar />
        <div
          className="flex flex-col justify-center items-center overflow-y-scroll scrollbar-thin scrollbar-thumb-[#ee7f2b] scrollbar-track-white scroll-smooth custom-scrollbar"
          style={{
            scrollMarginLeft: '1rem',
          }}
        >
          <Content />
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
