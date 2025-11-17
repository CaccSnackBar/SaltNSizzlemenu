import React, { useRef } from 'react';
import { Theme } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { CloseIcon } from './icons/CloseIcon';

interface ThemeScrollerProps {
  themes: Theme[];
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  previewTheme: Theme | null;
  onPreviewTheme: (theme: Theme | null) => void;
  onClose: () => void;
}

const ThemeScroller: React.FC<ThemeScrollerProps> = ({ themes, currentTheme, onThemeChange, previewTheme, onPreviewTheme, onClose }) => {
    const displayTheme = previewTheme || currentTheme;
    
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

    interface ThemeSectionProps {
        title: string;
        themes: Theme[];
    }
    const ThemeSection: React.FC<ThemeSectionProps> = ({ title, themes }) => {
        const scrollContainerRef = useRef<HTMLDivElement>(null);
        
        const scroll = (direction: 'left' | 'right') => {
            if (scrollContainerRef.current) {
                const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
                scrollContainerRef.current.scrollBy({
                    left: direction === 'left' ? -scrollAmount : scrollAmount,
                    behavior: 'smooth',
                });
            }
        };

        return (
            <div>
                <h4 className="font-bold text-xl uppercase tracking-wider mb-4 pl-1" style={{ color: displayTheme.colors.textPrimary, fontFamily: displayTheme.fontHeader }}>{title}</h4>
                <div className="relative">
                    <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors" aria-label="Scroll left">
                         <ArrowLeftIcon className="w-6 h-6 text-white" />
                    </button>
                    <div ref={scrollContainerRef} className="flex items-start gap-4 overflow-x-auto pb-4 px-2 theme-section-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                       {themes.map(t => <ThemeSwatch key={t.id} theme={t} />)}
                    </div>
                     <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors" aria-label="Scroll right">
                        <ArrowRightIcon className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>
        )
    };
    
    interface ThemeSwatchProps {
      theme: Theme;
    }
    const ThemeSwatch: React.FC<ThemeSwatchProps> = ({ theme }) => (
        <button
          onClick={() => onThemeChange(theme)}
          onMouseEnter={() => onPreviewTheme(theme)}
          onMouseLeave={() => onPreviewTheme(null)}
          className="flex flex-col items-center gap-2 group focus:outline-none flex-shrink-0"
          aria-label={`Select ${theme.name} theme`}
        >
          <div
            className={`w-48 h-28 rounded-lg border-2 overflow-hidden relative flex flex-col items-center justify-end p-1 transition-all duration-200 ${currentTheme.id === theme.id ? 'border-blue-500 scale-105 shadow-xl' : 'border-transparent group-hover:scale-100 group-focus:ring-2 group-focus:ring-blue-400'}`}
            style={{ background: theme.colors.background }}
          >
            <div className="w-full h-1/3 rounded-t-md" style={{ backgroundColor: theme.colors.header }}></div>
            <div className="w-full h-2/3 flex items-center justify-evenly">
                <div className="w-8 h-2 rounded-full" style={{backgroundColor: theme.colors.textPrimary}}></div>
                <div className="w-12 h-2 rounded-full" style={{backgroundColor: theme.colors.accent}}></div>
            </div>
            {currentTheme.id === theme.id && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                <CheckIcon className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          <span className={`text-base text-center font-medium transition-colors w-40 truncate ${currentTheme.id === theme.id ? 'font-bold' : ''}`} style={{color: displayTheme.colors.textSecondary}}>
            {theme.name}
          </span>
        </button>
      );

  return (
    <>
      <style>{`
        .theme-section-scrollbar::-webkit-scrollbar,
        .theme-scroller-main-track::-webkit-scrollbar {
          display: none;
        }
        .theme-scroller-main-track {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
      `}</style>
      <div 
          className="fixed bottom-0 left-0 right-0 z-40 p-4 transition-colors duration-200"
          style={{
              maxHeight: '70vh',
              background: displayTheme.colors.cardBackground,
              color: displayTheme.colors.textPrimary,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              fontFamily: displayTheme.fontBody,
              borderTop: `1px solid ${displayTheme.colors.cardBorder || 'transparent'}`
          }}
          onMouseLeave={() => onPreviewTheme(null)}
      >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors z-20" aria-label="Close theme selector">
              <CloseIcon className="w-6 h-6" style={{color: displayTheme.colors.textPrimary}}/>
          </button>
          <div className="h-full overflow-y-auto theme-scroller-main-track pr-4 -mr-4">
              <div className="max-w-screen-xl mx-auto space-y-6">
                  {categoryOrder.map(category => {
                      const categoryThemes = themeGroups[category];
                      if (!categoryThemes || categoryThemes.length === 0) return null;
                      const title = categoryTitles[category] || category;
                      return <ThemeSection key={category} title={title} themes={categoryThemes} />;
                  })}
              </div>
          </div>
      </div>
    </>
  );
};

export default ThemeScroller;