import React, { useState, useEffect } from 'react';
import { MenuCategory, Theme } from '../types';
import { INITIAL_MENU, LOCAL_STORAGE_KEY_MENU, LOCAL_STORAGE_KEY_THEME } from '../constants';
import { THEMES } from '../themes';

const FullScreenMenu: React.FC = () => {
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Load theme from localStorage
    const savedThemeId = localStorage.getItem(LOCAL_STORAGE_KEY_THEME) || THEMES[0].id;
    const activeTheme = THEMES.find(t => t.id === savedThemeId) || THEMES[0];
    setTheme(activeTheme);

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

  useEffect(() => {
    // Update body background color when theme changes
    if (theme) {
      document.body.style.backgroundColor = theme.colors.background;
      document.body.style.transition = 'background-color 500ms ease';
    }
    // Cleanup function to reset body style when component unmounts
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.transition = '';
    };
  }, [theme]);

  if (!theme || menu.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e0e8e2]">
        <h1 className="font-brand text-5xl text-gray-800 animate-pulse">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-12 lg:p-16 transition-colors duration-500">
      <header className="text-center mb-12">
        <h1
          className="font-brand text-7xl md:text-8xl lg:text-9xl tracking-wider"
          style={{ color: theme.colors.heading }}
        >
          SALT & SIZZLE
        </h1>
      </header>
      <main className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-12">
          {menu.map(category => (
            <div key={category.id}>
              <h2
                className="text-4xl font-bold uppercase tracking-wide mb-6"
                style={{ color: theme.colors.heading }}
              >
                {category.name}
              </h2>
              <div className="space-y-8">
                {category.items.map(item => (
                  <div
                    key={item.id}
                    className="p-6 rounded-xl shadow-md border"
                    style={{
                      backgroundColor: theme.colors.cardBg,
                      borderColor: theme.colors.cardBorder,
                      opacity: item.isCrossedOut ? 0.4 : 1,
                      transition: 'opacity 300ms',
                    }}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h3
                        className={`text-2xl font-bold ${item.isCrossedOut ? 'line-through' : ''}`}
                        style={{ color: theme.colors.heading }}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`text-2xl font-bold whitespace-nowrap ${item.isCrossedOut ? 'line-through' : ''}`}
                        style={{ color: theme.colors.heading }}
                      >
                        {item.price}
                      </p>
                    </div>
                    <p
                      className={`mt-2 text-lg whitespace-pre-line ${item.isCrossedOut ? 'line-through' : ''}`}
                      style={{ color: theme.colors.text }}
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
          className="text-base uppercase"
          style={{ color: theme.colors.text }}
        >
          Disclaimer: All food is while supplies last
        </p>
      </footer>
    </div>
  );
};

export default FullScreenMenu;
