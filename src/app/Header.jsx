// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Blog</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/blog" className="hover:underline">Blog</a></li>
            <li><a href="/" className="hover:underline">Home</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
