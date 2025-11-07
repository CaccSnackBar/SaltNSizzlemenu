
import React from 'react';
import { Theme } from '../types';

interface ThemePopoverProps {
  themes: Theme[];
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemePopover: React.FC<ThemePopoverProps> = ({ themes, currentTheme, onThemeChange }) => {
  return (
    <div 
        className="absolute top-14 right-0 w-72 rounded-lg shadow-2xl p-4 z-20"
        style={{
            backgroundColor: currentTheme.colors.cardBackground,
            color: currentTheme.colors.textPrimary,
        }}
    >
      <h3 className="text-center text-lg font-bold uppercase tracking-wider mb-4" style={{ color: currentTheme.colors.textPrimary }}>Select Theme</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {themes.map(t => (
          <button
            key={t.id}
            onClick={() => onThemeChange(t)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-200 ${currentTheme.id === t.id ? 'shadow-lg scale-105' : 'shadow-sm'}`}
            style={{
              backgroundColor: t.colors.cardBackground,
              borderColor: currentTheme.id === t.id ? t.colors.header : 'transparent',
              color: t.colors.textPrimary
            }}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemePopover;
