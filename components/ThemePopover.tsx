import React from 'react';
import { Theme } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface ThemePopoverProps {
  themes: Theme[];
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemePopover: React.FC<ThemePopoverProps> = ({ themes, currentTheme, onThemeChange }) => {
    const dailyThemes = themes.filter(t => t.category === 'daily');
    const paletteThemes = themes.filter(t => t.category === 'palette');
    const holidayThemes = themes.filter(t => t.category === 'holiday');

    // Fix: Explicitly type ThemeSwatch as a React Functional Component to correctly handle the 'key' prop.
    interface ThemeSwatchProps {
      theme: Theme;
    }
    const ThemeSwatch: React.FC<ThemeSwatchProps> = ({ theme }) => (
        <button
          onClick={() => onThemeChange(theme)}
          className="flex flex-col items-center gap-1.5 group focus:outline-none"
          aria-label={`Select ${theme.name} theme`}
        >
          <div
            className={`w-14 h-9 rounded-md border-2 overflow-hidden relative flex flex-col items-center justify-end p-0.5 transition-all duration-200 ${currentTheme.id === theme.id ? 'border-blue-500 scale-110 shadow-lg' : 'border-transparent group-hover:scale-105 group-focus:ring-2 group-focus:ring-blue-400'}`}
            style={{ backgroundColor: theme.colors.background }}
          >
            <div className="w-full h-1/3 rounded-t-sm" style={{ backgroundColor: theme.colors.header }}></div>
            <div className="w-full h-2/3 flex items-center justify-evenly">
                <div className="w-3 h-1.5 rounded-full" style={{backgroundColor: theme.colors.textPrimary}}></div>
                <div className="w-5 h-1.5 rounded-full" style={{backgroundColor: theme.colors.textSecondary}}></div>
            </div>

            {currentTheme.id === theme.id && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-sm">
                <CheckIcon className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
          <span className={`text-xs text-center font-medium transition-colors w-16 truncate ${currentTheme.id === theme.id ? 'font-bold' : ''}`} style={{color: currentTheme.colors.textSecondary}}>
            {theme.name}
          </span>
        </button>
      );
    
      // Fix: Explicitly type ThemeSection as a React Functional Component for consistency.
      interface ThemeSectionProps {
        title: string;
        themes: Theme[];
      }
      const ThemeSection: React.FC<ThemeSectionProps> = ({ title, themes }) => (
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-3 pl-1" style={{ color: currentTheme.colors.textSecondary }}>{title}</h4>
          <div className="grid grid-cols-4 gap-x-2 gap-y-3">
            {themes.map(t => <ThemeSwatch key={t.id} theme={t} />)}
          </div>
        </div>
      );

  return (
    <div 
        className="absolute top-14 right-0 w-[300px] rounded-lg shadow-2xl p-4 z-20 space-y-5"
        style={{
            backgroundColor: currentTheme.colors.cardBackground,
            color: currentTheme.colors.textPrimary,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
        }}
    >
      <ThemeSection title="Daily" themes={dailyThemes} />
      <ThemeSection title="Color Palettes" themes={paletteThemes} />
      <ThemeSection title="Holidays" themes={holidayThemes} />
    </div>
  );
};

export default ThemePopover;
