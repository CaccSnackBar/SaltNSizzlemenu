import React from 'react';
import { MenuCategory as MenuCategoryType, MenuItem as MenuItemType } from '../types';
import MenuItem from './MenuItem';
import { PlusIcon } from './icons/PlusIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';

interface MenuCategoryProps {
  category: MenuCategoryType;
  isAdmin: boolean;
  onAddItem: () => void;
  onEditItem: (item: MenuItemType) => void;
  onDeleteItem: (itemId: string) => void;
  onToggleCrossOut: (itemId: string) => void;
  onToggleFeatured: (itemId: string) => void;
  onEditCategory: () => void;
  onDeleteCategory: () => void;
  // Drag and Drop props
  draggedCategoryId: string | null;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, categoryId: string) => void;
  onDrop: (targetCategoryId: string) => void;
  onDragEnd: () => void;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ 
    category, 
    isAdmin, 
    onAddItem, 
    onEditItem, 
    onDeleteItem, 
    onToggleCrossOut, 
    onToggleFeatured,
    onEditCategory, 
    onDeleteCategory,
    draggedCategoryId,
    onDragStart,
    onDrop,
    onDragEnd
}) => {
  // ADMIN VIEW: Render the entire category in a single card for easier management.
  if (isAdmin) {
    const isBeingDragged = draggedCategoryId === category.id;
    const isDragHappening = !!draggedCategoryId;
    
    return (
      <div 
        draggable={isAdmin}
        onDragStart={(e) => onDragStart(e, category.id)}
        onDragOver={(e) => {
            // Allow dropping only on other categories
            if (isDragHappening && !isBeingDragged) {
                e.preventDefault();
            }
        }}
        onDrop={(e) => {
            e.preventDefault();
            onDrop(category.id);
        }}
        onDragEnd={onDragEnd}
        className={`rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 
            ${isBeingDragged ? 'opacity-40 ring-2 ring-blue-500 ring-offset-2' : 'hover:shadow-2xl'} 
            ${isDragHappening && !isBeingDragged ? 'outline-dashed outline-2 outline-offset-4 outline-gray-400' : ''}`}
        style={{
          backgroundColor: 'var(--color-card-background)',
          border: '1px solid var(--color-card-border)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className={`p-5 flex justify-between items-center ${isAdmin ? 'cursor-grab active:cursor-grabbing' : ''}`} style={{ borderBottom: '1px solid var(--color-card-border)' }}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide" style={{ fontFamily: 'var(--font-header)', color: 'var(--color-text-primary)' }}>
            {category.name}
          </h2>
          <div className="flex items-center gap-2 flex-shrink-0">
             <button
              onClick={onAddItem}
              className="px-3 py-1 text-sm font-semibold rounded-md transition-colors hover:bg-black/5"
              style={{ 
                  color: 'var(--color-text-primary)', 
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-card-border)',
              }}
              aria-label={`Add item to ${category.name}`}
            >
              + Add
            </button>
            <button onClick={onEditCategory} className="p-1.5 rounded-full hover:bg-black/10 transition-colors" aria-label="Edit category name">
              <PencilIcon className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
            </button>
            <button onClick={onDeleteCategory} className="p-1.5 rounded-full hover:bg-black/10 transition-colors" aria-label="Delete category">
              <TrashIcon className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
            </button>
          </div>
        </div>
        <div className="p-5 space-y-4 flex-grow">
          {category.items.map(item => (
            <MenuItem
              key={item.id}
              item={item}
              isAdmin={isAdmin}
              onEdit={() => onEditItem(item)}
              onDelete={() => onDeleteItem(item.id)}
              onToggleCrossOut={() => onToggleCrossOut(item.id)}
              onToggleFeatured={() => onToggleFeatured(item.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  // PUBLIC VIEW: Render as a column with a title and individual item cards.
  return (
    <div className="flex flex-col gap-4" style={{ breakInside: 'avoid' }}>
      <h2 className="text-xl md:text-2xl font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-header)', color: 'var(--color-text-primary)' }}>
        {category.name}
      </h2>
      
      <div className="flex flex-col gap-4">
        {category.items.map(item => (
          <MenuItem
            key={item.id}
            item={item}
            isAdmin={isAdmin}
            onEdit={() => onEditItem(item)}
            onDelete={() => onDeleteItem(item.id)}
            onToggleCrossOut={() => onToggleCrossOut(item.id)}
            onToggleFeatured={() => onToggleFeatured(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;