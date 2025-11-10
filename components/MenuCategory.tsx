import React from 'react';
import { MenuCategory, Theme } from '../types';
import MenuItemComponent from './MenuItem';
import { PlusIcon } from './icons/PlusIcon';

interface MenuCategoryProps {
  category: MenuCategory;
  onEditItem: (item: any) => void;
  onDeleteItem: (itemId: string) => void;
  onAddItem: () => void;
  onToggleItemAvailability: (itemId: string) => void;
  isEditMode: boolean;
  theme: Theme;
}

const MenuCategoryComponent: React.FC<MenuCategoryProps> = ({ category, onEditItem, onDeleteItem, onAddItem, onToggleItemAvailability, isEditMode, theme }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 
          className={`text-3xl font-bold uppercase tracking-wide ${!isEditMode ? 'md:text-4xl' : ''}`}
          style={{ 
            color: theme.colors.header,
            fontFamily: theme.fontHeader 
          }}
        >
          {category.name}
        </h2>
        {isEditMode && (
            <button 
                onClick={onAddItem}
                className="flex items-center gap-1 text-sm bg-gray-700 text-white py-1 px-3 rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
            >
              <PlusIcon className="w-4 h-4" /> Add
            </button>
        )}
      </div>
      <div className="space-y-4">
        {category.items.map(item => (
          <MenuItemComponent
            key={item.id}
            item={item}
            onEdit={() => onEditItem(item)}
            onDelete={() => onDeleteItem(item.id)}
            onToggleAvailability={() => onToggleItemAvailability(item.id)}
            isEditMode={isEditMode}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCategoryComponent;
