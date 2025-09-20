import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 tracking-tighter">
        AI Strategy Generator
      </h1>
      <p className="mt-4 text-lg text-gray-300/90 max-w-2xl mx-auto">
        Define your objective, and let our AI craft a detailed, actionable plan to help you achieve your goals.
      </p>
    </header>
  );
};

export default Header;