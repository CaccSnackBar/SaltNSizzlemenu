import React, { useState, useCallback, useEffect, useRef } from 'react';
import { MenuCategory, MenuItem, Theme } from './types';
import { INITIAL_MENU, LOCAL_STORAGE_KEY_MENU, LOCAL_STORAGE_KEY_THEME, LOCAL_STORAGE_KEY_SOUND } from './constants';
import { themes } from './themes';
import MenuCategoryComponent from './components/MenuCategory';
import Modal from './components/Modal';
import MenuItemForm from './components/MenuItemForm';
import { PlusIcon } from './components/icons/PlusIcon';
import { EyeIcon } from './components/icons/EyeIcon';
import { LoginIcon } from './components/icons/LoginIcon';
import { ResetIcon } from './components/icons/ResetIcon';
import { ExpandIcon } from './components/icons/ExpandIcon';
import { PaletteIcon } from './components/icons/PaletteIcon';
import { SoundOnIcon } from './components/icons/SoundOnIcon';
import { SoundOffIcon } from './components/icons/SoundOffIcon';
import LoginScreen from './components/LoginScreen';
import FullScreenMenu from './components/FullScreenMenu';
import ThemePopover from './components/ThemePopover';
import { playSound } from './utils/audio';
import AnimatedBackground from './components/AnimatedBackground';

const getHolidayTheme = (): string | null => {
    const today = new Date();
    const month = today.getMonth(); // 0 = January, 11 = December
    const day = today.getDate();
  
    if ((month === 11 && day >= 27) || (month === 0 && day <= 2)) return 'holiday-newyears';
    if (month === 1 && day >= 7 && day <= 14) return 'holiday-valentines';
    if (month === 2 && day >= 10 && day <= 17) return 'holiday-stpatricks';
    if ((month === 2 && day >= 20) || (month === 3 && day <= 20)) return 'holiday-easter';
    if (month === 6 && day >= 1 && day <= 7) return 'holiday-july4';
    if (month === 8 && day >= 15 && day <= 22) return 'holiday-pirate'; // Talk like a Pirate Day is Sep 19
    if (month === 9 && day >= 24 && day <= 31) return 'holiday-halloween';
    if (month === 10 && day >= 22 && day <= 28) return 'holiday-thanksgiving';
    if (month === 11 && day >= 1 && day <= 26) return 'holiday-christmas';
  
    return null;
};

const HOLIDAY_GREETINGS: { [key: string]: string } = {
    'holiday-valentines': "Happy Valentine's Day!",
    'holiday-stpatricks': "Happy St. Patrick's Day!",
    'holiday-easter': 'Happy Easter!',
    'holiday-july4': 'Happy Fourth of July!',
    'holiday-pirate': 'Ahoy, Matey!',
    'holiday-halloween': 'Happy Halloween!',
    'holiday-thanksgiving': 'Happy Thanksgiving!',
    'holiday-christmas': 'Happy Holidays!',
    'holiday-newyears': "Happy New Year!",
};

const SaltShakerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.82 10H5.18A2.2 2.2 0 0 0 3 12.2v5.6A2.2 2.2 0 0 0 5.18 20h13.64A2.2 2.2 0 0 0 21 17.8v-5.6A2.2 2.2 0 0 0 18.82 10Z" />
      <path d="M12 4v6" />
      <path d="M15.29 4.71a2.5 2.5 0 0 0-3.54-3.54" />
      <path d="M8.71 4.71a2.5 2.5 0 0 1 3.54-3.54" />
      <path d="m14 2-2.09 2.09" />
      <path d="m10 2 2.09 2.09" />
      <path d="M12 10.5 10 9" />
      <path d="m14 9-2 1.5" />
    </svg>
);


const App: React.FC = () => {
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<MenuItem | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState<string>('tuesday');
  const [isThemePopoverOpen, setIsThemePopoverOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  
  const themePopoverRef = useRef<HTMLDivElement>(null);

  const activeTheme = themes.find(t => t.id === activeThemeId) || themes[0];
  const holidayGreeting = HOLIDAY_GREETINGS[activeTheme.id];

  useEffect(() => {
    try {
      const savedMenu = localStorage.getItem(LOCAL_STORAGE_KEY_MENU);
      if (savedMenu) {
        setMenu(JSON.parse(savedMenu));
      } else {
        setMenu(INITIAL_MENU);
      }

      const holidayThemeId = getHolidayTheme();
      const savedThemeId = localStorage.getItem(LOCAL_STORAGE_KEY_THEME);
      
      if (holidayThemeId && holidayThemeId !== savedThemeId) {
        setActiveThemeId(holidayThemeId);
        // Don't save holiday theme as the default for next time
      } else if (savedThemeId) {
        setActiveThemeId(savedThemeId);
      } else {
        const day = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
        const dailyTheme = themes.find(t => t.id === day) || themes[0];
        setActiveThemeId(dailyTheme.id);
      }

      const savedSoundSetting = localStorage.getItem(LOCAL_STORAGE_KEY_SOUND);
      if (savedSoundSetting) {
        setSoundEnabled(JSON.parse(savedSoundSetting));
      }

    } catch (error) {
      console.error("Could not load data from localStorage:", error);
      setMenu(INITIAL_MENU);
      setActiveThemeId('tuesday');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_MENU, JSON.stringify(menu));
    } catch (error) {
      console.error("Could not save menu to localStorage:", error);
    }
  }, [menu]);

  useEffect(() => {
    try {
        if (!activeTheme.category.startsWith('holiday')) {
            localStorage.setItem(LOCAL_STORAGE_KEY_THEME, activeThemeId);
        }
    } catch (error) {
        console.error("Could not save theme to localStorage:", error);
    }
    document.body.style.fontFamily = activeTheme.fontBody;
    document.body.style.background = activeTheme.colors.background;
  }, [activeThemeId, activeTheme]);
  
  useEffect(() => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY_SOUND, JSON.stringify(soundEnabled));
    } catch (error) {
        console.error("Could not save sound setting to localStorage:", error);
    }
  }, [soundEnabled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isThemePopoverOpen && themePopoverRef.current && !themePopoverRef.current.contains(event.target as Node)) {
        const paletteButton = document.getElementById('palette-button');
        if (paletteButton && !paletteButton.contains(event.target as Node)) {
          setIsThemePopoverOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isThemePopoverOpen]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsEditMode(true);
  };
  
  const handleAddItem = (categoryId: string) => {
    playSound(activeTheme.sounds?.open, soundEnabled);
    setItemToEdit(null);
    setEditingCategoryId(categoryId);
    setIsModalOpen(true);
  };
  
  const handleEditItem = (item: MenuItem, categoryId: string) => {
    playSound(activeTheme.sounds?.open, soundEnabled);
    setItemToEdit(item);
    setEditingCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (itemId: string, categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenu(prevMenu => prevMenu.map(category => {
        if (category.id === categoryId) {
          return { ...category, items: category.items.filter(item => item.id !== itemId) };
        }
        return category;
      }));
    }
  };
  
  const handleSaveItem = (itemData: MenuItem) => {
    if (itemToEdit) { // Editing existing item
      setMenu(prevMenu => prevMenu.map(category => ({
        ...category,
        items: category.items.map(item => item.id === itemData.id ? itemData : item)
      })));
    } else { // Adding new item
      playSound(activeTheme.sounds?.add, soundEnabled);
      setMenu(prevMenu => prevMenu.map(category => {
        if (category.id === editingCategoryId) {
          return { ...category, items: [...category.items, itemData] };
        }
        return category;
      }));
    }
    setIsModalOpen(false);
    setItemToEdit(null);
    setEditingCategoryId(null);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
    setItemToEdit(null);
    setEditingCategoryId(null);
  };

  const handleToggleItemAvailability = (itemId: string, categoryId: string) => {
    setMenu(prevMenu => prevMenu.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => 
            item.id === itemId ? { ...item, isCrossedOut: !item.isCrossedOut } : item
          )
        };
      }
      return category;
    }));
  };

  const handleResetMenu = () => {
    if (window.confirm('Are you sure you want to reset the menu to its original state? This cannot be undone.')) {
      setMenu(INITIAL_MENU);
    }
  };

  const handleThemeChange = (theme: Theme) => {
    playSound(activeTheme.sounds?.change, soundEnabled);
    setActiveThemeId(theme.id);
    setIsThemePopoverOpen(false);
  }

  const handleToggleThemePopover = () => {
    playSound(activeTheme.sounds?.open, soundEnabled);
    setIsThemePopoverOpen(prev => !prev);
  }

  const handleToggleSound = () => {
    setSoundEnabled(prev => {
        const newState = !prev;
        if (newState) {
            // FIX: Cannot find name 'soundOpen'. Use the sound from the active theme.
            playSound(activeTheme.sounds?.open, true);
        }
        return newState;
    });
  }

  const handlePreviewTheme = (theme: Theme | null) => {
    setPreviewTheme(theme);
  };

  if (!isLoggedIn) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      return <LoginScreen onLoginSuccess={handleLogin} />;
    }
  }

  if (isFullScreen) {
    return <FullScreenMenu onExit={() => setIsFullScreen(false)} />;
  }

  const displayTheme = previewTheme || activeTheme;
  const titleText = "SALT & SIZZLE";

  return (
    <>
        <AnimatedBackground effect={activeTheme.specialEffect} />
        <div 
          className="min-h-screen p-4 sm:p-6 md:p-8 relative transition-colors duration-500"
          style={{ 
            color: activeTheme.colors.textSecondary,
            fontFamily: activeTheme.fontBody,
            background: activeTheme.specialEffect ? 'transparent' : activeTheme.colors.background,
          }}
        >
        <div className="max-w-4xl mx-auto">
            <header className="text-center mb-8 md:mb-12 relative">
                {holidayGreeting && <p className="text-2xl font-bold mb-4" style={{color: activeTheme.colors.header, fontFamily: activeTheme.fontHeader}}>{holidayGreeting}</p>}
                
                <h1
                  className="font-brand text-5xl md:text-7xl tracking-wider cursor-default title-hover-effect"
                  style={{ color: activeTheme.colors.header, fontFamily: activeTheme.fontHeader }}
                >
                   {titleText.split('').map((char, i) => (
                        <span
                            key={i}
                            className="inline-block transition-all duration-300 ease-out"
                            style={{ 
                                transitionDelay: `${i * 30}ms`,
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>
                
                <p className="mt-2 text-lg">Disclaimer: All food is while supplies last</p>
                
                <div className="absolute top-0 right-0 flex flex-col sm:flex-row gap-2">
                    {/* FIX: Moved style prop from Icon component to parent button to fix TypeScript error. The icon will inherit the color via `currentColor`. */}
                    <button id="palette-button" onClick={handleToggleThemePopover} className="p-2 bg-white/30 rounded-full shadow-md hover:bg-white/50 transition-colors" title="Change Theme" style={{color: activeTheme.colors.textPrimary}}><PaletteIcon className="w-5 h-5" /></button>
                    {/* FIX: Moved style prop from Icon component to parent button to fix TypeScript error. The icon will inherit the color via `currentColor`. */}
                    <button onClick={handleToggleSound} className="p-2 bg-white/30 rounded-full shadow-md hover:bg-white/50 transition-colors" title={soundEnabled ? "Mute Sounds" : "Unmute Sounds"} style={{color: activeTheme.colors.textPrimary}}>
                        {soundEnabled 
                            ? <SoundOnIcon className="w-5 h-5" />
                            : <SoundOffIcon className="w-5 h-5" />
                        }
                    </button>
                    {/* FIX: Moved style prop from Icon component to parent button to fix TypeScript error. The icon will inherit the color via `currentColor`. */}
                    <button onClick={() => setIsFullScreen(true)} className="p-2 bg-white/30 rounded-full shadow-md hover:bg-white/50 transition-colors" title="Fullscreen Mode" style={{color: activeTheme.colors.textPrimary}}><ExpandIcon className="w-5 h-5" /></button>
                    {/* FIX: Moved style prop from Icon component to parent button to fix TypeScript error. The icon will inherit the color via `currentColor`. */}
                    {isEditMode && <button onClick={handleResetMenu} className="p-2 bg-white/30 rounded-full shadow-md hover:bg-white/50 transition-colors" title="Reset Menu" style={{color: activeTheme.colors.textPrimary}}><ResetIcon className="w-5 h-5" /></button>}
                    {/* FIX: Moved style prop from Icon component to parent anchor tag to fix TypeScript error. The icon will inherit the color via `currentColor`. */}
                    {!isLoggedIn && <a href="?admin=true" className="p-2 bg-white/30 rounded-full shadow-md hover:bg-white/50 transition-colors" title="Admin Login" style={{color: activeTheme.colors.textPrimary}}><LoginIcon className="w-5 h-5" /></a>}
                </div>

                {isThemePopoverOpen && (
                    <div ref={themePopoverRef}>
                        <ThemePopover 
                            themes={themes} 
                            currentTheme={activeTheme} 
                            onThemeChange={handleThemeChange}
                            previewTheme={previewTheme}
                            onPreviewTheme={handlePreviewTheme}
                        />
                    </div>
                )}
            </header>

            <main className="space-y-10">
            {menu.map(category => (
                <MenuCategoryComponent
                    key={category.id}
                    category={category}
                    onAddItem={() => handleAddItem(category.id)}
                    onEditItem={(item) => handleEditItem(item, category.id)}
                    onDeleteItem={(itemId) => handleDeleteItem(itemId, category.id)}
                    onToggleItemAvailability={(itemId) => handleToggleItemAvailability(itemId, category.id)}
                    isEditMode={isEditMode}
                    theme={activeTheme}
                />
            ))}
            </main>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCancel}>
            <MenuItemForm
            itemToEdit={itemToEdit}
            onSave={handleSaveItem}
            onCancel={handleCancel}
            />
        </Modal>
        </div>
        <style>{`
            .title-hover-effect:hover span {
                color: ${activeTheme.colors.textPrimary};
                transform: translateY(-5px) scale(1.1);
            }
        `}</style>
    </>
  );
};

export default App;