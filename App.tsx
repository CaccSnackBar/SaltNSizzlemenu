
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { MenuCategory, MenuItem, Theme } from './types';
import { INITIAL_MENU, LOCAL_STORAGE_KEY_MENU, LOCAL_STORAGE_KEY_THEME } from './constants';
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
import LoginScreen from './components/LoginScreen';
import FullScreenMenu from './components/FullScreenMenu';
import ThemePopover from './components/ThemePopover';

const SaltShakerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.82 10H5.18A2.2 2.2 0 0 0 3 12.2v5.6A2.2 2.2 0 0 0 5.18 20h13.64A2.2 2.2 0 0 0 21 17.8v-5.6A2.2 2.2 0 0 0 18.82 10Z" />
      <path d="M12 4v6" />
      <path d="M15.29 4.71a2.5 2.5 0 0 0-3.54-3.54" />
      <path d="M8.71 4.71a2.5 2.5 0 0 1 3.54-3.54" />
      <path d="M7 4h10" />
    </svg>
);

function App() {
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [editingItem, setEditingItem] = useState<{ categoryId: string; item: MenuItem | null } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [isThemePopoverOpen, setIsThemePopoverOpen] = useState(false);
  const themePopoverRef = useRef<HTMLDivElement>(null);

  // Load menu and theme from localStorage on initial render
  useEffect(() => {
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

  useEffect(() => {
    const wantsToEdit = new URLSearchParams(window.location.search).get('edit') === 'true';
    if (wantsToEdit) {
        if (isAuthenticated) {
            setIsEditMode(true);
            setShowLogin(false);
        } else {
            setShowLogin(true);
        }
    } else {
        setIsEditMode(false);
        setShowLogin(false);
    }
  }, [isAuthenticated]);
  
  // Click outside handler for theme popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (themePopoverRef.current && !themePopoverRef.current.contains(event.target as Node)) {
        setIsThemePopoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [themePopoverRef]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleOpenModal = (categoryId: string, item: MenuItem | null) => {
    if (!isEditMode) return;
    setEditingItem({ categoryId, item });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const updateMenu = (updater: (prevMenu: MenuCategory[]) => MenuCategory[]) => {
    setMenu(prevMenu => {
        const newMenu = updater(prevMenu);
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY_MENU, JSON.stringify(newMenu));
        } catch (error) {
            console.error("Could not save menu to localStorage:", error);
        }
        return newMenu;
    });
  };

  const handleThemeChange = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY_THEME, selectedTheme.id);
    } catch (error) {
        console.error("Could not save theme to localStorage:", error);
    }
    setIsThemePopoverOpen(false); // Close popover on selection
  };

  const handleSaveItem = useCallback((categoryId: string, itemToSave: MenuItem) => {
    updateMenu(prevMenu => {
      return prevMenu.map(category => {
        if (category.id === categoryId) {
          if (itemToSave.id.startsWith('new-')) { // It's a new item
            return {
              ...category,
              items: [...category.items, { ...itemToSave, id: `item-${Date.now()}` }],
            };
          } else { // It's an existing item
            return {
              ...category,
              items: category.items.map(item =>
                item.id === itemToSave.id ? itemToSave : item
              ),
            };
          }
        }
        return category;
      });
    });
    handleCloseModal();
  }, []);

  const handleDeleteItem = useCallback((categoryId: string, itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
        updateMenu(prevMenu =>
          prevMenu.map(category => {
            if (category.id === categoryId) {
              return {
                ...category,
                items: category.items.filter(item => item.id !== itemId),
              };
            }
            return category;
          })
        );
    }
  }, []);

  const handleToggleItemAvailability = useCallback((categoryId: string, itemId: string) => {
    updateMenu(prevMenu =>
      prevMenu.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map(item =>
              item.id === itemId ? { ...item, isCrossedOut: !item.isCrossedOut } : item
            ),
          };
        }
        return category;
      })
    );
  }, []);

  const handleAddCategory = () => {
    const categoryName = window.prompt("Enter new category name:");
    if (categoryName && categoryName.trim() !== '') {
        updateMenu(prevMenu => [
            ...prevMenu,
            {
                id: `cat-${Date.now()}`,
                name: categoryName,
                items: []
            }
        ]);
    }
  };

  const handleResetMenu = () => {
    if (window.confirm('Are you sure you want to reset the entire menu to its original state? This cannot be undone.')) {
      updateMenu(() => INITIAL_MENU);
    }
  };
  
  if (showLogin) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />
  }

  if (isFullScreen) {
    return <FullScreenMenu onExit={() => setIsFullScreen(false)} />;
  }

  return (
    <div 
      style={{ backgroundColor: theme.colors.background }}
      className={`min-h-screen text-gray-800 relative transition-all duration-300 ${!isEditMode ? 'p-8 sm:p-12 md:p-16' : 'p-4 sm:p-6 md:p-8'}`}
    >
       <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-10 flex items-center gap-4">
        <div ref={themePopoverRef} className="relative">
            <button
                onClick={() => setIsThemePopoverOpen(prev => !prev)}
                className="flex items-center gap-2 bg-white/70 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                style={{ backgroundColor: theme.colors.cardBackground }}
                aria-label="Change theme"
                title="Change theme"
            >
                <PaletteIcon className="w-5 h-5" />
                <span className="hidden sm:inline font-semibold">Theme</span>
            </button>
            {isThemePopoverOpen && (
                <ThemePopover
                    themes={themes}
                    currentTheme={theme}
                    onThemeChange={handleThemeChange}
                />
            )}
        </div>
        <button
            onClick={() => setIsFullScreen(true)}
            className="flex items-center gap-2 bg-white/70 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
            style={{ backgroundColor: theme.colors.cardBackground }}
            aria-label="Launch Fullscreen Display"
            title="Launch Fullscreen Display"
        >
            <ExpandIcon className="w-5 h-5" />
            <span className="hidden sm:inline font-semibold">Fullscreen</span>
        </button>
        <button
            onClick={() => {
              if (isEditMode) {
                window.location.href = window.location.pathname;
              } else {
                window.location.search = 'edit=true';
              }
            }}
            className="flex items-center gap-2 bg-white/70 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
            style={{ backgroundColor: theme.colors.cardBackground }}
            aria-label={isEditMode ? 'View Public Menu' : 'Admin Login'}
            title={isEditMode ? 'View Public Menu' : 'Admin Login'}
        >
            {isEditMode ? <EyeIcon className="w-5 h-5" /> : <LoginIcon className="w-5 h-5" />}
            <span className="hidden sm:inline font-semibold">{isEditMode ? 'Public View' : 'Admin Login'}</span>
        </button>
      </div>
      
      <header className={`text-center transition-all duration-300 ${!isEditMode ? 'mb-8' : 'mb-8 md:mb-12'}`}>
        <h1 className="font-brand text-5xl md:text-7xl tracking-wider" style={{ color: theme.colors.header }}>SALT & SIZZLE</h1>
        {isEditMode && (
            <>
                <div className="flex justify-center items-center mt-4">
                    <SaltShakerIcon />
                    <p className="text-2xl font-bold uppercase tracking-widest ml-2" style={{ color: theme.colors.textPrimary }}>Admin Panel</p>
                </div>
                <p className="mt-4 text-sm uppercase" style={{ color: theme.colors.textSecondary }}>You are in edit mode. Changes are saved automatically.</p>
            </>
        )}
         {!isEditMode && (
             <p className="mt-4 text-sm uppercase" style={{ color: theme.colors.textSecondary }}>Disclaimer: All food is while supplies last</p>
         )}
      </header>
      
      <main className="max-w-7xl mx-auto">
        <div className={`grid ${!isEditMode ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12' : 'grid-cols-1 md:grid-cols-2 gap-8'}`}>
          {menu.map(category => (
            <MenuCategoryComponent
              key={category.id}
              category={category}
              onEditItem={(item) => handleOpenModal(category.id, item)}
              onDeleteItem={(itemId) => handleDeleteItem(category.id, itemId)}
              onAddItem={() => handleOpenModal(category.id, null)}
              onToggleItemAvailability={(itemId) => handleToggleItemAvailability(category.id, itemId)}
              isEditMode={isEditMode}
              theme={theme}
            />
          ))}
        </div>

        {isEditMode && (
            <div className="mt-12">
                <div className="text-center flex flex-wrap justify-center items-center gap-4">
                    <button
                        onClick={handleAddCategory}
                        className="bg-gray-700 text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 flex items-center gap-2"
                    >
                        <PlusIcon className="w-5 h-5"/>
                        Add New Category
                    </button>
                    <button
                        onClick={handleResetMenu}
                        className="bg-white text-red-600 border border-red-600 py-2 px-6 rounded-lg shadow-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 flex items-center gap-2"
                        title="Reset menu to default"
                    >
                        <ResetIcon className="w-5 h-5" />
                        Reset Menu
                    </button>
                </div>
            </div>
        )}
      </main>

      {isModalOpen && editingItem && (
         <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <MenuItemForm
                itemToEdit={editingItem.item}
                onSave={(item) => handleSaveItem(editingItem.categoryId, item)}
                onCancel={handleCloseModal}
            />
         </Modal>
      )}
    </div>
  );
}

export default App;
