import React from 'react';
import { Theme } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { CloseIcon } from './icons/CloseIcon';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  themes: Theme[];
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({ isOpen, onClose, themes, currentTheme, onThemeChange }) => {
  if (!isOpen) return null;

  const categoryTitles: Record<string, string> = {
    interactive: 'Interactive',
    daily: 'Daily Drivers',
    palette: 'Color Palettes',
    nature: "Nature's Palette",
    urban: 'Urban Vibes',
    gourmet: 'Gourmet',
    vintage: 'Vintage',
    holiday: 'Holidays',
  };

  const categoryOrder: (Theme['category'])[] = ['interactive', 'daily', 'palette', 'nature', 'urban', 'gourmet', 'vintage', 'holiday'];

  const themeGroups = themes.reduce<Record<string, Theme[]>>((acc, theme) => {
    (acc[theme.category] = acc[theme.category] || []).push(theme);
    return acc;
  }, {});

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col p-4 md:p-8 overflow-y-auto"
      style={{
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.textPrimary,
        fontFamily: currentTheme.fontBody,
      }}
    >
      <header className="flex items-center justify-between mb-8 flex-shrink-0">
        <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: currentTheme.fontHeader }}>
          Choose a Theme
        </h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10 transition-colors" aria-label="Close theme selector">
          <CloseIcon className="w-8 h-8" style={{ color: currentTheme.colors.textPrimary }} />
        </button>
      </header>

      <div className="space-y-10">
        {categoryOrder.map(category => {
          const categoryThemes = themeGroups[category];
          if (!categoryThemes || categoryThemes.length === 0) return null;
          const title = categoryTitles[category] || category;

          return (
            <section key={category}>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: currentTheme.fontHeader }}>
                {title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {categoryThemes.map(theme => {
                  const isCurrent = currentTheme.id === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => onThemeChange(theme)}
                      className={`flex flex-col items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg transition-transform duration-200 ${isCurrent ? '' : 'hover:scale-105'}`}
                      style={{
                          borderColor: currentTheme.colors.accent,
                          '--tw-ring-offset-color': currentTheme.colors.background
                      } as React.CSSProperties}
                      aria-label={`Select ${theme.name} theme`}
                    >
                      <div
                        className={`w-full aspect-[4/3] rounded-lg shadow-lg overflow-hidden relative flex flex-col transition-all duration-200 border-4 ${isCurrent ? 'border-opacity-100' : 'border-opacity-0 group-hover:border-opacity-50'}`}
                        style={{
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.accent
                        }}
                      >
                        <div className="h-1/3 p-2 flex items-center" style={{ backgroundColor: theme.colors.header, fontFamily: theme.fontHeader, color: theme.colors.textPrimary, fontSize: '0.7rem' }}>
                          Header
                        </div>
                        <div className="flex-grow p-2" style={{ fontFamily: theme.fontBody, color: theme.colors.textSecondary, fontSize: '0.6rem' }}>
                          <p style={{ color: theme.colors.textPrimary }}>Primary Text</p>
                          <p>Secondary Text</p>
                          <div className="w-1/2 h-1.5 mt-1 rounded-full" style={{ backgroundColor: theme.colors.accent }}></div>
                        </div>
                        {isCurrent && (
                          <div className="absolute top-2 right-2 bg-white/80 rounded-full p-0.5">
                            <CheckIcon className="w-4 h-4" style={{ color: theme.colors.accent }}/>
                          </div>
                        )}
                      </div>
                      <span className={`text-sm text-center font-semibold w-full truncate ${isCurrent ? 'font-bold' : ''}`} style={{ color: currentTheme.colors.textPrimary }}>
                        {theme.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelectorModal;
