import React, { useState, useEffect } from 'react';
import { MenuCategory, Theme } from '../types';
import { INITIAL_MENU, LOCAL_STORAGE_KEY_MENU, LOCAL_STORAGE_KEY_THEME } from '../constants';
import { themes } from '../themes';
import { CloseIcon } from './icons/CloseIcon';

interface FullScreenMenuProps {
  onExit: () => void;
}

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ onExit }) => {
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [theme, setTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    // Load menu and theme from localStorage
    try {
      const savedMenu = localStorage.getItem(LOCAL_STORAGE_KEY_MENU);
      if (savedMenu) {
        setMenu(JSON.parse(savedMenu));
      } else {
        setMenu(INITIAL_MENU);
      }
      
      const savedThemeId = localStorage.getItem(LOCAL_STORAGE_KEY_THEME);
      const activeTheme = themes.find(t => t.id === savedThemeId) || themes[0];
      setTheme(activeTheme);

    } catch (error) {
      console.error("Could not load data from localStorage:", error);
      setMenu(INITIAL_MENU);
      setTheme(themes[0]);
    }
  }, []);


  if (menu.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: theme.colors.background}}>
        <h1 className="font-brand text-5xl animate-pulse" style={{ color: theme.colors.header }}>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-10 relative" style={{backgroundColor: theme.colors.background}}>
      <button
        onClick={onExit}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-20 flex items-center gap-2 text-gray-700 p-3 rounded-full shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
        style={{ backgroundColor: theme.colors.cardBackground, color: theme.colors.textPrimary }}
        aria-label="Exit Fullscreen Display"
        title="Exit Fullscreen Display"
      >
        <CloseIcon className="w-6 h-6" />
      </button>

      <header className="text-center mb-12">
        <h1
          className="font-brand text-[clamp(3.25rem,8vw,5rem)] tracking-wider"
          style={{ color: theme.colors.header }}
        >
          SALT & SIZZLE
        </h1>
      </header>
      <main className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10">
          {menu.map(category => (
            <div key={category.id}>
              <h2
                className="text-[clamp(1.5rem,5vw,2.25rem)] font-bold uppercase tracking-wide mb-6"
                style={{ color: theme.colors.header }}
              >
                {category.name}
              </h2>
              <div className="space-y-6">
                {category.items.map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl shadow-md border border-transparent"
                    style={{
                      backgroundColor: theme.colors.cardBackground,
                      opacity: item.isCrossedOut ? 0.4 : 1,
                      transition: 'opacity 300ms',
                    }}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h3
                        className={`text-[clamp(1.1rem,3vw,1.375rem)] font-bold ${item.isCrossedOut ? 'line-through' : ''}`}
                        style={{ color: theme.colors.textPrimary }}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`text-[clamp(1.1rem,3vw,1.375rem)] font-bold whitespace-nowrap ${item.isCrossedOut ? 'line-through' : ''}`}
                        style={{ color: theme.colors.textPrimary }}
                      >
                        {item.price}
                      </p>
                    </div>
                    <p
                      className={`mt-2 text-[clamp(0.9rem,2.5vw,1.1rem)] whitespace-pre-line ${item.isCrossedOut ? 'line-through' : ''}`}
                       style={{ color: theme.colors.textSecondary }}
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
          className="text-[clamp(0.8rem,2vw,1rem)] uppercase"
           style={{ color: theme.colors.textSecondary }}
        >
          Disclaimer: All food is while supplies last
        </p>
      </footer>
    </div>
  );
};

export default FullScreenMenu;
