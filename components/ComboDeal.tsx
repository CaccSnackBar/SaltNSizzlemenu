import React from 'react';
import { MenuItem } from '../types';
import { TagIcon } from './icons/TagIcon';

interface ComboDealProps {
  items: MenuItem[];
}

/**
 * A simple utility to parse the first number from a price string.
 * Handles formats like "$3.00", "Sm $1.00 / Lg $2.00", "2 for $1.00".
 * @param priceString The price string to parse.
 * @returns The parsed numeric price, or 0 if none is found.
 */
const parsePrice = (priceString: string): number => {
    const match = priceString.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[0]) : 0;
};

const ComboDeal: React.FC<ComboDealProps> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  const originalPrice = items.reduce((total, item) => total + parsePrice(item.price), 0);
  const comboPrice = originalPrice - 1.50; // Apply a fixed discount for the combo

  if (comboPrice <= 0 || originalPrice <= comboPrice) {
      return null; // Don't show a deal if it's not a discount
  }

  return (
    <div 
        className="p-5 rounded-xl shadow-lg"
        style={{
          backgroundColor: 'var(--color-card-background)',
          border: '1px solid var(--color-card-border)',
        }}
    >
        <div className="flex items-center gap-3 mb-4">
            <TagIcon className="w-7 h-7" style={{ color: 'var(--color-text-primary)' }} />
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide" style={{ fontFamily: 'var(--font-header)', color: 'var(--color-text-primary)' }}>
                Recommended Combo
            </h2>
        </div>
        
        <div className="pl-10">
            <ul className="list-disc list-inside space-y-2 mb-4" style={{ color: 'var(--color-text-secondary)'}}>
                {items.map(item => (
                    <li key={item.id} className="text-xl" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}>{item.name}</li>
                ))}
            </ul>

            <div className="flex items-baseline justify-end gap-6">
                <div className="text-right">
                    <p className="text-md uppercase" style={{ color: 'var(--color-text-secondary)' }}>Original Price</p>
                    <p className="text-3xl font-semibold line-through" style={{ color: 'var(--color-text-secondary)' }}>
                        ${originalPrice.toFixed(2)}
                    </p>
                </div>
                 <div className="text-right">
                    <p className="text-md uppercase font-bold" style={{ color: 'var(--color-accent)' }}>Combo Price</p>
                    <p className="text-5xl font-bold" style={{ color: 'var(--color-accent)' }}>
                        ${comboPrice.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>

    </div>
  );
};

export default ComboDeal;