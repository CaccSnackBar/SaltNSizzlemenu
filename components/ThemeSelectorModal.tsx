
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
  rotationInterval: number;
  onRotationIntervalChange: (interval: number) => void;
}

const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({ 
    isOpen, 
    onClose, 
    themes, 
    currentTheme, 
    onThemeChange,
    rotationInterval,
    onRotationIntervalChange
}) => {
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

  const rotationOptions = [
      { label: 'Off', value: 0 },
      { label: '1m', value: 60000 },
      { label: '5m', value: 300000 },
      { label: '30m', value: 1800000 },
      { label: '1h', value: 3600000 },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col p-4 md:p-8 overflow-y-auto"
      style={{
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.textPrimary,
        fontFamily: currentTheme.fontBody,
      }}
    >
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 flex-shrink-0 gap-4">
        <div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: currentTheme.fontHeader }}>
            Choose a Theme
            </h2>
            
            <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-bold uppercase tracking-wider opacity-70">Auto-Rotate:</span>
                <div className="flex bg-black/10 rounded-lg p-1 gap-1 overflow-x-auto">
                    {rotationOptions.map((opt) => (
                        <button
                            key={opt.label}
                            onClick={() => onRotationIntervalChange(opt.value)}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all whitespace-nowrap ${
                                rotationInterval === opt.value 
                                ? 'bg-white shadow-sm text-black' 
                                : 'hover:bg-black/5 opacity-60 hover:opacity-100'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10 transition-colors" aria-label="Close theme selector">
          <CloseIcon className="w-8 h-8" style={{ color: currentTheme.colors.textPrimary }} />
        </button>
      </header>

      <div className="space-y-10 pb-10">
        {categoryOrder.map(category => {
          const categoryThemes = themeGroups[category];
          if (!categoryThemes || categoryThemes.length === 0) return null;
          const title = categoryTitles[category] || category;

          return (
            <section key={category}>
              <h3 className="text-2xl font-bold mb-4 border-b pb-2" style={{ fontFamily: currentTheme.fontHeader, borderColor: currentTheme.colors.cardBorder }}>
                {title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {categoryThemes.map(theme => {
                  const isCurrent = currentTheme.id === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => onThemeChange(theme)}
                      className={`flex flex-col gap-3 group focus:outline-none transition-transform duration-200 ${isCurrent ? '' : 'hover:-translate-y-1'}`}
                      aria-label={`Select ${theme.name} theme`}
                    >
                      {/* Theme Preview Card */}
                      <div
                        className={`w-full aspect-video rounded-xl shadow-md overflow-hidden relative flex flex-col border-2 transition-all duration-200 ${isCurrent ? 'ring-4 ring-offset-2' : 'hover:shadow-xl'}`}
                        style={{
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.cardBorder || 'transparent',
                          '--tw-ring-color': theme.colors.accent,
                          '--tw-ring-offset-color': currentTheme.colors.background
                        } as React.CSSProperties}
                      >
                        {/* Header Preview */}
                        <div className="h-1/3 p-3 flex items-center justify-between" style={{ backgroundColor: theme.colors.header }}>
                           <span style={{ fontFamily: theme.fontHeader, color: theme.colors.textPrimary, fontSize: '1.5rem' }}>Aa</span>
                           <div className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.colors.accent }}></div>
                        </div>
                        
                        {/* Body Preview */}
                        <div className="flex-grow p-3 flex flex-col justify-between" style={{ fontFamily: theme.fontBody, color: theme.colors.textSecondary }}>
                          <div className="space-y-2">
                            <div className="h-2 w-3/4 rounded opacity-60" style={{ backgroundColor: theme.colors.textPrimary }}></div>
                            <div className="h-2 w-1/2 rounded opacity-40" style={{ backgroundColor: theme.colors.textSecondary }}></div>
                          </div>
                          
                          {/* Explicit Palette Swatches */}
                          <div className="flex gap-1.5 pt-2">
                             {[theme.colors.background, theme.colors.header, theme.colors.textPrimary, theme.colors.accent].map((color, i) => (
                                 <div key={i} className="w-4 h-4 rounded-full shadow-sm border border-black/10" style={{ backgroundColor: color }} title="Palette Color" />
                             ))}
                          </div>
                        </div>

                        {isCurrent && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                            <div className="bg-white rounded-full p-2 shadow-lg">
                                <CheckIcon className="w-6 h-6 text-green-600" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Theme Name */}
                      <span className={`text-lg font-medium text-center w-full ${isCurrent ? 'font-bold' : ''}`} style={{ fontFamily: currentTheme.fontBody }}>
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