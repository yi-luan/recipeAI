import React from 'react';
import Content from './components/content';
import Navbar from './components/navbar';

const LayoutPage: React.FC = () => {
  return (
    <div
      style={{ backgroundColor: '#FCFAF7' }}
      className="m-auto flex h-screen w-full items-center justify-center"
    >
      <div className="mx-auto flex h-full w-full flex-col rounded-lg bg-white shadow-md sm:w-11/12">
        <Navbar />
        <div
          className="custom-scrollbar flex scrollbar-thin scrollbar-thumb-[#ee7f2b] scrollbar-track-white flex-col items-center justify-center overflow-y-scroll scroll-smooth"
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
