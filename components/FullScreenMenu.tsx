import React, { useState, useEffect } from 'react';
import { MenuCategory } from '../types';
import { INITIAL_MENU, LOCAL_STORAGE_KEY_MENU } from '../constants';
import { CloseIcon } from './icons/CloseIcon';

interface FullScreenMenuProps {
  onExit: () => void;
}

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ onExit }) => {
  const [menu, setMenu] = useState<MenuCategory[]>([]);

  useEffect(() => {
    // Load menu from localStorage
    try {
      const savedMenu = localStorage.getItem(LOCAL_STORAGE_KEY_MENU);
      if (savedMenu) {
        setMenu(JSON.parse(savedMenu));
      } else {
        setMenu(INITIAL_MENU);
      }
    } catch (error) {
      console.error("Could not load menu from localStorage:", error);
      setMenu(INITIAL_MENU);
    }
  }, []);


  if (menu.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e0e8e2]">
        <h1 className="font-brand text-5xl text-gray-800 animate-pulse">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-12 lg:p-16 bg-[#e0e8e2] relative">
      <button
        onClick={onExit}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-20 flex items-center gap-2 bg-white/70 text-gray-700 p-3 rounded-full shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-[#e0e8e2] transition-all duration-200"
        aria-label="Exit Fullscreen Display"
        title="Exit Fullscreen Display"
      >
        <CloseIcon className="w-6 h-6" />
      </button>

      <header className="text-center mb-12">
        <h1
          className="font-brand text-6xl md:text-7xl xl:text-8xl tracking-wider text-gray-800"
        >
          SALT & SIZZLE
        </h1>
      </header>
      <main className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-12">
          {menu.map(category => (
            <div key={category.id}>
              <h2
                className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-6 text-gray-800"
              >
                {category.name}
              </h2>
              <div className="space-y-8">
                {category.items.map(item => (
                  <div
                    key={item.id}
                    className="p-6 rounded-xl shadow-md border bg-white/50 border-transparent"
                    style={{
                      opacity: item.isCrossedOut ? 0.4 : 1,
                      transition: 'opacity 300ms',
                    }}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h3
                        className={`text-xl md:text-2xl font-bold text-gray-800 ${item.isCrossedOut ? 'line-through' : ''}`}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`text-xl md:text-2xl font-bold whitespace-nowrap text-gray-800 ${item.isCrossedOut ? 'line-through' : ''}`}
                      >
                        {item.price}
                      </p>
                    </div>
                    <p
                      className={`mt-2 text-base md:text-lg whitespace-pre-line text-gray-700 ${item.isCrossedOut ? 'line-through' : ''}`}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="text-center mt-16">
        <p
          className="text-sm md:text-base uppercase text-gray-700"
        >
          Disclaimer: All food is while supplies last
        </p>
      </footer>
    </div>
  );
};

export default FullScreenMenu;