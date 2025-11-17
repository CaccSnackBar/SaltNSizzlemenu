import React from 'react';
import { MenuItem as MenuItemType } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { EyeIcon } from './icons/EyeIcon';
import { EyeSlashIcon } from './icons/EyeSlashIcon';
import { StarIcon } from './icons/StarIcon';

interface MenuItemProps {
  item: MenuItemType;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleCrossOut: () => void;
  onToggleFeatured: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isAdmin, onEdit, onDelete, onToggleCrossOut, onToggleFeatured }) => {
  const isCrossedOut = item.isCrossedOut ?? false;
  const isFeatured = item.isFeatured ?? false;

  const wrapperClasses = isAdmin
    ? `transition-opacity duration-300 ${isCrossedOut ? 'opacity-50' : ''}`
    : `p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${isCrossedOut ? 'opacity-50' : ''}`;

  const wrapperStyle = isAdmin 
    ? {} 
    : {
        backgroundColor: 'var(--color-card-background)',
        border: '1px solid var(--color-card-border)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
      };

  return (
    <div className={wrapperClasses} style={wrapperStyle}>
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-2">
            {isFeatured && <StarIcon className="w-4 h-4 text-yellow-500 flex-shrink-0" />}
            <h3 className={`text-lg font-semibold ${isCrossedOut ? 'line-through' : ''}`} style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}>
              {item.name}
            </h3>
        </div>
        <span className={`text-lg font-semibold flex-shrink-0 ${isCrossedOut ? 'line-through' : ''}`} style={{ color: 'var(--color-accent)' }}>
          {item.price}
        </span>
      </div>
      {item.description && (
        <p className="mt-1 text-sm whitespace-pre-line" style={{ color: 'var(--color-text-secondary)' }}>
          {item.description}
        </p>
      )}
      {isAdmin && (
        <div className="flex items-center justify-end gap-2 mt-2">
           <button onClick={onToggleFeatured} className="p-1.5 rounded-full hover:bg-black/10" aria-label={isFeatured ? 'Unmark as featured' : 'Mark as featured'}>
            <StarIcon className={`w-5 h-5 transition-colors ${isFeatured ? 'text-yellow-500 fill-current' : ''}`} style={{ color: isFeatured ? 'var(--color-accent)' : 'var(--color-text-secondary)' }} />
          </button>
          <button onClick={onToggleCrossOut} className="p-1.5 rounded-full hover:bg-black/10" aria-label={isCrossedOut ? 'Un-cross out item' : 'Cross out item'}>
            {isCrossedOut ? 
              <EyeIcon className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }}/> : 
              <EyeSlashIcon className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }}/>
            }
          </button>
          <button onClick={onEdit} className="p-1.5 rounded-full hover:bg-black/10" aria-label="Edit item">
            <PencilIcon className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }}/>
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-full hover:bg-black/10" aria-label="Delete item">
            <TrashIcon className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }}/>
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItem;