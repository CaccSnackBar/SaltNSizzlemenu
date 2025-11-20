
import React, { useState, useEffect } from 'react';
import { MenuCategory as MenuCategoryType, MenuItem as MenuItemType, Theme, DealOfTheDay, StaffDirectory } from './types';
import { 
    INITIAL_MENU, 
    LOCAL_STORAGE_KEY_MENU, 
    LOCAL_STORAGE_KEY_THEME, 
    LOCAL_STORAGE_KEY_SOUND, 
    LOCAL_STORAGE_KEY_DEAL, 
    INITIAL_DEAL,
    LOCAL_STORAGE_KEY_STAFF,
    INITIAL_STAFF,
    LOCAL_STORAGE_KEY_THEME_ROTATION
} from './constants';
import MenuCategory from './components/MenuCategory';
import Modal from './components/Modal';
import MenuItemForm from './components/MenuItemForm';
import LoginScreen from './components/LoginScreen';
import { themes } from './themes';
import ThemeSelectorModal from './components/ThemeSelectorModal';
import { PaletteIcon } from './components/icons/PaletteIcon';
import { ResetIcon } from './components/icons/ResetIcon';
import { LoginIcon } from './components/icons/LoginIcon';
import { SoundOnIcon } from './components/icons/SoundOnIcon';
import { SoundOffIcon } from './components/icons/SoundOffIcon';
import { playSound } from './utils/audio';
import AnimatedBackground from './components/AnimatedBackground';
import { useKonami } from './hooks/useKonami';
import FullScreenMenu from './components/FullScreenMenu';
import CategoryForm from './components/CategoryForm';
import { PlusIcon } from './components/icons/PlusIcon';
import { ExpandIcon } from './components/icons/ExpandIcon';
import { LogoutIcon } from './components/icons/LogoutIcon';
import DealOfTheDayBanner from './components/DealOfTheDayBanner';
import ComboDeal from './components/ComboDeal';
import DealEditor from './components/DealEditor';
import StaffEditor from './components/StaffEditor';

const App: React.FC = () => {
    // State management
    const [menu, setMenu] = useState<MenuCategoryType[]>(() => {
        try {
            const savedMenu = localStorage.getItem(LOCAL_STORAGE_KEY_MENU);
            return savedMenu ? JSON.parse(savedMenu) : INITIAL_MENU;
        } catch (error) {
            console.error("Could not parse menu from localStorage", error);
            return INITIAL_MENU;
        }
    });
    
    const [deal, setDeal] = useState<DealOfTheDay>(() => {
        try {
            const savedDeal = localStorage.getItem(LOCAL_STORAGE_KEY_DEAL);
            return savedDeal ? JSON.parse(savedDeal) : INITIAL_DEAL;
        } catch (error) {
            console.error("Could not parse deal from localStorage", error);
            return INITIAL_DEAL;
        }
    });

    const [staff, setStaff] = useState<StaffDirectory>(() => {
        try {
            const savedStaff = localStorage.getItem(LOCAL_STORAGE_KEY_STAFF);
            return savedStaff ? JSON.parse(savedStaff) : INITIAL_STAFF;
        } catch (error) {
            console.error("Could not parse staff from localStorage", error);
            return INITIAL_STAFF;
        }
    });

    const [isAdmin, setIsAdmin] = useState(false);
    
    // Item Modal State
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<{ item: MenuItemType, categoryId: string } | null>(null);
    const [categoryForNewItem, setCategoryForNewItem] = useState<string | null>(null);

    // Category Modal State
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<MenuCategoryType | null>(null);

    // Delete Confirmation Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<MenuCategoryType | null>(null);

    const [isFullScreen, setIsFullScreen] = useState(false);

    // Drag and Drop State
    const [draggedCategoryId, setDraggedCategoryId] = useState<string | null>(null);

    const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
        const savedThemeId = localStorage.getItem(LOCAL_STORAGE_KEY_THEME);
        return themes.find(t => t.id === savedThemeId) || themes[0];
    });
    const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
    
    // Theme Rotation State (Interval in milliseconds, 0 = off)
    const [themeRotationInterval, setThemeRotationInterval] = useState<number>(() => {
        try {
            const savedInterval = localStorage.getItem(LOCAL_STORAGE_KEY_THEME_ROTATION);
            return savedInterval ? parseInt(savedInterval, 10) : 0;
        } catch (error) {
            console.error("Could not parse theme rotation interval", error);
            return 0;
        }
    });
    
    const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
        try {
            const savedSound = localStorage.getItem(LOCAL_STORAGE_KEY_SOUND);
            return savedSound !== null ? JSON.parse(savedSound) : true;
        } catch (error) {
            console.error("Could not parse sound setting from localStorage", error);
            return true;
        }
    });

    // Persist State to LocalStorage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_MENU, JSON.stringify(menu));
    }, [menu]);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_DEAL, JSON.stringify(deal));
    }, [deal]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_STAFF, JSON.stringify(staff));
    }, [staff]);

    // Save theme to localStorage and apply styles
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_THEME, currentTheme.id);
        const themeToApply = currentTheme;
        document.documentElement.style.setProperty('--color-background', themeToApply.colors.background);
        document.documentElement.style.setProperty('--color-header', themeToApply.colors.header);
        document.documentElement.style.setProperty('--color-text-primary', themeToApply.colors.textPrimary);
        document.documentElement.style.setProperty('--color-text-secondary', themeToApply.colors.textSecondary);
        document.documentElement.style.setProperty('--color-card-background', themeToApply.colors.cardBackground);
        document.documentElement.style.setProperty('--color-card-border', themeToApply.colors.cardBorder || 'transparent');
        document.documentElement.style.setProperty('--color-accent', themeToApply.colors.accent);
        document.documentElement.style.setProperty('--font-header', themeToApply.fontHeader);
        document.documentElement.style.setProperty('--font-body', themeToApply.fontBody);
    }, [currentTheme]);

    // Save sound setting
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_SOUND, JSON.stringify(isSoundEnabled));
    }, [isSoundEnabled]);

    // Save rotation setting
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_THEME_ROTATION, themeRotationInterval.toString());
    }, [themeRotationInterval]);

    // Real-time sync between tabs/windows
    useEffect(() => {
        const syncState = (event: StorageEvent) => {
            if (event.key === LOCAL_STORAGE_KEY_MENU && event.newValue) {
                try { setMenu(JSON.parse(event.newValue)); } catch (e) { console.error(e); }
            }
            if (event.key === LOCAL_STORAGE_KEY_DEAL && event.newValue) {
                try { setDeal(JSON.parse(event.newValue)); } catch (e) { console.error(e); }
            }
            if (event.key === LOCAL_STORAGE_KEY_STAFF && event.newValue) {
                try { setStaff(JSON.parse(event.newValue)); } catch (e) { console.error(e); }
            }
            if (event.key === LOCAL_STORAGE_KEY_THEME && event.newValue) {
                setCurrentTheme(themes.find(t => t.id === event.newValue) || themes[0]);
            }
            if (event.key === LOCAL_STORAGE_KEY_SOUND && event.newValue) {
                try { setIsSoundEnabled(JSON.parse(event.newValue)); } catch (e) { console.error(e); }
            }
            if (event.key === LOCAL_STORAGE_KEY_THEME_ROTATION && event.newValue) {
                try { setThemeRotationInterval(parseInt(event.newValue, 10)); } catch (e) { console.error(e); }
            }
        };

        window.addEventListener('storage', syncState);
        return () => {
            window.removeEventListener('storage', syncState);
        };
    }, []);

    // Auto-Rotation Logic
    useEffect(() => {
        // Only the Admin window controls the rotation to prevent race conditions and jitter
        // If rotation is off (0), do nothing.
        if (themeRotationInterval === 0 || !isAdmin) return;

        const intervalId = setInterval(() => {
            const currentIndex = themes.findIndex(t => t.id === currentTheme.id);
            const nextIndex = (currentIndex + 1) % themes.length;
            // We don't play sound on auto-rotation to avoid annoyance
            setCurrentTheme(themes[nextIndex]);
        }, themeRotationInterval);

        return () => clearInterval(intervalId);
    }, [themeRotationInterval, currentTheme, isAdmin]);


    const handleLoginSuccess = () => {
        setIsAdmin(true);
        window.location.hash = '';
    };
    
    const handleLogout = () => {
        setIsAdmin(false);
    };

    // Item CRUD operations
    const handleSaveItem = (item: MenuItemType) => {
        const categoryId = itemToEdit?.categoryId || categoryForNewItem;
        if (!categoryId) return;

        setMenu(prevMenu => {
            const newMenu = [...prevMenu];
            const categoryIndex = newMenu.findIndex(cat => cat.id === categoryId);
            if (categoryIndex === -1) return prevMenu;

            const category = { ...newMenu[categoryIndex] };
            const itemIndex = category.items.findIndex(i => i.id === item.id);

            if (itemIndex > -1) { // Editing existing item
                category.items[itemIndex] = item;
            } else { // Adding new item
                category.items.push(item);
            }

            newMenu[categoryIndex] = category;
            return newMenu;
        });
        closeItemModal();
    };
    
    const handleDeleteItem = (itemId: string, categoryId: string) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            setMenu(prevMenu => {
                const newMenu = [...prevMenu];
                const categoryIndex = newMenu.findIndex(cat => cat.id === categoryId);
                if (categoryIndex === -1) return prevMenu;

                const category = { ...newMenu[categoryIndex] };
                category.items = category.items.filter(item => item.id !== itemId);
                newMenu[categoryIndex] = category;
                return newMenu;
            });
        }
    };
    
    const handleToggleCrossOut = (itemId: string, categoryId: string) => {
        setMenu(prevMenu => {
            const newMenu = [...prevMenu];
            const categoryIndex = newMenu.findIndex(cat => cat.id === categoryId);
            if (categoryIndex === -1) return prevMenu;
    
            const category = { ...newMenu[categoryIndex] };
            const itemIndex = category.items.findIndex(i => i.id === itemId);
            if (itemIndex === -1) return prevMenu;
    
            const item = { ...category.items[itemIndex] };
            item.isCrossedOut = !item.isCrossedOut;
            category.items[itemIndex] = item;
            newMenu[categoryIndex] = category;
            return newMenu;
        });
    };

    const handleToggleCombo = (itemId: string, categoryId: string) => {
        setMenu(prevMenu => {
            const newMenu = [...prevMenu];
            const categoryIndex = newMenu.findIndex(cat => cat.id === categoryId);
            if (categoryIndex === -1) return prevMenu;
    
            const category = { ...newMenu[categoryIndex] };
            const itemIndex = category.items.findIndex(i => i.id === itemId);
            if (itemIndex === -1) return prevMenu;
    
            const item = { ...category.items[itemIndex] };
            item.isFeatured = !item.isFeatured;
            category.items[itemIndex] = item;
            newMenu[categoryIndex] = category;
            return newMenu;
        });
    };

    const handleAddItem = (categoryId: string) => {
        setItemToEdit(null);
        setCategoryForNewItem(categoryId);
        setIsItemModalOpen(true);
    };

    const handleEditItem = (item: MenuItemType, categoryId: string) => {
        setCategoryForNewItem(null);
        setItemToEdit({ item, categoryId });
        setIsItemModalOpen(true);
    };

    const closeItemModal = () => {
        setIsItemModalOpen(false);
        setItemToEdit(null);
        setCategoryForNewItem(null);
    };
    
    // Category CRUD operations
    const handleOpenAddCategoryModal = () => {
        setCategoryToEdit(null);
        setIsCategoryModalOpen(true);
    };

    const handleOpenEditCategoryModal = (category: MenuCategoryType) => {
        setCategoryToEdit(category);
        setIsCategoryModalOpen(true);
    };

    const handleCloseCategoryModal = () => {
        setIsCategoryModalOpen(false);
        setCategoryToEdit(null);
    };

    const handleSaveCategory = (categoryData: { id: string; name: string }) => {
        setMenu(prevMenu => {
            const isEditing = prevMenu.some(c => c.id === categoryData.id);
            if (isEditing) {
                return prevMenu.map(c => c.id === categoryData.id ? { ...c, name: categoryData.name } : c);
            } else {
                const newCategory: MenuCategoryType = { ...categoryData, items: [] };
                return [...prevMenu, newCategory];
            }
        });
        handleCloseCategoryModal();
    };

    const handleDeleteCategory = (categoryId: string) => {
        const category = menu.find(c => c.id === categoryId);
        if (category) {
            setCategoryToDelete(category);
            setIsDeleteModalOpen(true);
        }
    };

    const confirmDeleteCategory = () => {
        if (!categoryToDelete) return;
        setMenu(prevMenu => prevMenu.filter(c => c.id !== categoryToDelete.id));
        setIsDeleteModalOpen(false);
        setCategoryToDelete(null);
    };

    const cancelDeleteCategory = () => {
        setIsDeleteModalOpen(false);
        setCategoryToDelete(null);
    };
    
    const handleResetMenu = () => {
        if (window.confirm("Are you sure you want to reset the menu to its original state? All changes will be lost.")) {
            setMenu(INITIAL_MENU);
        }
    }

    // Drag and Drop Handlers
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, categoryId: string) => {
        setDraggedCategoryId(categoryId);
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
        }
    };

    const handleDrop = (targetCategoryId: string) => {
        if (!draggedCategoryId || draggedCategoryId === targetCategoryId) {
            setDraggedCategoryId(null);
            return;
        }

        setMenu(prevMenu => {
            const draggedIndex = prevMenu.findIndex(cat => cat.id === draggedCategoryId);
            const targetIndex = prevMenu.findIndex(cat => cat.id === targetCategoryId);

            if (draggedIndex === -1 || targetIndex === -1) return prevMenu;

            const newMenu = [...prevMenu];
            const [draggedItem] = newMenu.splice(draggedIndex, 1);
            newMenu.splice(targetIndex, 0, draggedItem);
            return newMenu;
        });
        setDraggedCategoryId(null);
    };

    const handleDragEnd = () => {
        setDraggedCategoryId(null);
    };

    const handleThemeChange = (theme: Theme) => {
        playSound(theme.sound?.click, isSoundEnabled);
        setCurrentTheme(theme);
    };

    const handleSoundToggle = () => {
        playSound(currentTheme.sound?.toggle, !isSoundEnabled);
        setIsSoundEnabled(prev => !prev);
    };

    useKonami(() => {
        const konamiTheme = themes.find(t => t.id === 'konami');
        if (konamiTheme) {
            handleThemeChange(konamiTheme);
        }
    });

    if (window.location.hash === '#/admin' && !isAdmin) {
        return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }
    
    const themeToApply = currentTheme;

    const comboItems = menu.flatMap(category => 
        category.items.filter(item => item.isFeatured)
    );

    return (
        <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
            {isFullScreen && (
                <FullScreenMenu 
                    menu={menu} 
                    deal={deal} 
                    comboItems={comboItems} 
                    staff={staff}
                    onClose={() => setIsFullScreen(false)} 
                />
            )}
            
            <AnimatedBackground effect={themeToApply.backgroundEffect} />
            <header className="p-4 md:p-6 shadow-md sticky top-0 z-10 transition-colors duration-300 flex justify-between items-center" style={{ backgroundColor: 'var(--color-header)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                <div className="text-center flex-grow">
                    <h1 className="font-brand text-4xl md:text-6xl tracking-wider" style={{ fontFamily: 'var(--font-header)', color: 'var(--color-text-primary)' }}>SALT & SIZZLE</h1>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button onClick={handleSoundToggle} className="p-2 rounded-full hover:bg-black/10 transition-colors" aria-label="Toggle sound">
                        {isSoundEnabled ? 
                            <SoundOnIcon className="w-6 h-6" style={{ color: 'var(--color-text-secondary)' }} /> : 
                            <SoundOffIcon className="w-6 h-6" style={{ color: 'var(--color-text-secondary)' }} />
                        }
                    </button>
                    <div className="relative">
                        <button onClick={() => setIsThemeSelectorOpen(p => !p)} className="p-2 rounded-full hover:bg-black/10 transition-colors" aria-label="Change theme">
                            <PaletteIcon className="w-6 h-6" style={{ color: 'var(--color-text-secondary)' }} />
                        </button>
                        {themeRotationInterval > 0 && (
                             <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                             </span>
                        )}
                    </div>
                     <button onClick={() => setIsFullScreen(true)} className="p-2 rounded-full hover:bg-black/10 transition-colors" aria-label="Fullscreen mode">
                        <ExpandIcon className="w-6 h-6" style={{ color: 'var(--color-text-secondary)' }} />
                    </button>
                    
                    {isAdmin ? (
                        <button onClick={handleLogout} className="p-2 rounded-full hover:bg-black/10 transition-colors" aria-label="Logout">
                            <LogoutIcon className="w-6 h-6" style={{ color: 'var(--color-text-secondary)' }}/>
                        </button>
                    ) : (
                        <a href="/#/admin" className="p-2 rounded-full hover:bg-black/10 transition-colors" aria-label="Admin Login">
                            <LoginIcon className="w-6 h-6" style={{ color: 'var(--color-text-secondary)' }} />
                        </a>
                    )}
                    
                    {isAdmin && (
                        <button onClick={handleResetMenu} className="p-2 rounded-full hover:bg-black/10 transition-colors" aria-label="Reset menu">
                            <ResetIcon className="w-6 h-6" style={{ color: 'var(--color-text-secondary)' }}/>
                        </button>
                    )}
                </div>
            </header>
            
            <main className="p-4 md:p-8">
                 {deal.isVisible && !isAdmin && <DealOfTheDayBanner text={deal.text} />}

                {isAdmin && (
                    <div className="max-w-4xl mx-auto mb-8 space-y-8">
                        <DealEditor currentDeal={deal} onSave={setDeal} />
                        <StaffEditor staff={staff} onSave={setStaff} />
                        
                        <div className="text-center">
                            <button
                                onClick={handleOpenAddCategoryModal}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold rounded-lg transition-colors"
                                style={{ 
                                    color: 'var(--color-text-primary)', 
                                    backgroundColor: 'var(--color-card-background)',
                                    border: '1px solid var(--color-card-border)',
                                }}
                                aria-label="Add new category"
                            >
                                <PlusIcon className="w-6 h-6" />
                                Add New Category
                            </button>
                        </div>
                    </div>
                )}
                
                {comboItems.length > 0 && (
                     <div className={`mx-auto mb-12 ${isAdmin ? 'max-w-4xl' : 'max-w-7xl'}`}>
                        <ComboDeal items={comboItems} />
                        <hr className="my-8 border-dashed" style={{ borderColor: 'var(--color-card-border)' }} />
                    </div>
                )}

                <div className={`mx-auto grid gap-x-8 gap-y-12 items-start ${isAdmin ? 'max-w-4xl grid-cols-1' : 'max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                    {menu.map(category => (
                        <MenuCategory
                            key={category.id}
                            category={category}
                            isAdmin={isAdmin}
                            onAddItem={() => handleAddItem(category.id)}
                            onEditItem={(item) => handleEditItem(item, category.id)}
                            onDeleteItem={(itemId) => handleDeleteItem(itemId, category.id)}
                            onToggleCrossOut={(itemId) => handleToggleCrossOut(itemId, category.id)}
                            onToggleCombo={(itemId) => handleToggleCombo(itemId, category.id)}
                            onEditCategory={() => handleOpenEditCategoryModal(category)}
                            onDeleteCategory={() => handleDeleteCategory(category.id)}
                            draggedCategoryId={draggedCategoryId}
                            onDragStart={handleDragStart}
                            onDrop={handleDrop}
                            onDragEnd={handleDragEnd}
                        />
                    ))}
                </div>
            </main>
            
            <footer className="p-4 text-center" style={{fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)'}}>
              <p className="mb-4 text-xs uppercase tracking-wider">Disclaimer: All food is while supplies last</p>
              <p className="text-sm">&copy; {new Date().getFullYear()} Salt & Sizzle. All Rights Reserved.</p>
            </footer>

            <Modal isOpen={isItemModalOpen} onClose={closeItemModal}>
                <MenuItemForm
                    itemToEdit={itemToEdit?.item || null}
                    onSave={handleSaveItem}
                    onCancel={closeItemModal}
                />
            </Modal>

            <Modal isOpen={isCategoryModalOpen} onClose={handleCloseCategoryModal}>
                <CategoryForm 
                    categoryToEdit={categoryToEdit} 
                    onSave={handleSaveCategory} 
                    onCancel={handleCloseCategoryModal} 
                />
            </Modal>

             <Modal isOpen={isDeleteModalOpen} onClose={cancelDeleteCategory}>
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Delete Category?</h3>
                    <p className="mb-6 text-gray-600">
                        Are you sure you want to delete <strong>{categoryToDelete?.name}</strong>? 
                        <br/>
                        <span className="text-red-500 text-sm font-bold">This will delete all items inside it!</span>
                    </p>
                    <div className="flex justify-center gap-4">
                         <button 
                            onClick={cancelDeleteCategory}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={confirmDeleteCategory}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
            
            <ThemeSelectorModal
              isOpen={isThemeSelectorOpen}
              onClose={() => setIsThemeSelectorOpen(false)}
              themes={themes}
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
              rotationInterval={themeRotationInterval}
              onRotationIntervalChange={setThemeRotationInterval}
            />

        </div>
    );
};

export default App;