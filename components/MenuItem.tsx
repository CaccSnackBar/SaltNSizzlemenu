import React from 'react';
import { MenuItem, Theme } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { EyeIcon } from './icons/EyeIcon';
import { EyeSlashIcon } from './icons/EyeSlashIcon';

interface MenuItemProps {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggleAvailability: () => void;
  isEditMode: boolean;
  theme: Theme;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ item, onEdit, onDelete, onToggleAvailability, isEditMode, theme }) => {
  const containerClasses = `p-4 rounded-lg relative transition-all duration-300 ${item.isCrossedOut ? 'opacity-50' : ''} ${isEditMode ? 'group' : ''}`;
  const textClasses = item.isCrossedOut ? 'line-through' : '';

  return (
    <div 
      className={containerClasses}
      style={{ 
        backgroundColor: theme.colors.cardBackground,
        border: theme.colors.cardBorder || '1px solid transparent',
        boxShadow: theme.colors.cardBoxShadow || '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }}
    >
       {isEditMode && (
        <div className="absolute top-2 right-2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
                onClick={onToggleAvailability} 
                className="p-1.5 bg-gray-200 rounded-full text-gray-600 hover:bg-yellow-200 hover:text-yellow-700 transition-colors"
                aria-label={item.isCrossedOut ? 'Mark as available' : 'Mark as unavailable'}
                title={item.isCrossedOut ? 'Mark as available' : 'Mark as unavailable'}
            >
                {item.isCrossedOut ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
            </button>
            <button 
                onClick={onEdit} 
                className="p-1.5 bg-gray-200 rounded-full text-gray-600 hover:bg-blue-200 hover:text-blue-700 transition-colors"
                aria-label="Edit item"
                title="Edit item"
            >
                <PencilIcon className="w-4 h-4" />
            </button>
            <button 
                onClick={onDelete} 
                className="p-1.5 bg-gray-200 rounded-full text-gray-600 hover:bg-red-200 hover:text-red-700 transition-colors"
                aria-label="Delete item"
                title="Delete item"
            >
                <TrashIcon className="w-4 h-4" />
            </button>
        </div>
       )}

      <div className="flex justify-between items-start">
        <h3 
            className={`text-lg font-bold ${isEditMode ? 'pr-28' : 'pr-2'} ${textClasses}`}
            style={{ 
                color: theme.colors.textPrimary,
                fontFamily: theme.fontHeader,
            }}
        >
            {item.name}
        </h3>
        <p 
            className={`text-lg font-bold whitespace-nowrap ${textClasses}`}
            style={{ color: theme.colors.textPrimary }}
        >
            {item.price}
        </p>
      </div>
      <p 
        className={`mt-1 text-sm whitespace-pre-line ${textClasses}`}
        style={{ color: theme.colors.textSecondary }}
      >
        {item.description}
      </p>
    </div>
  );
};

export default MenuItemComponent;
