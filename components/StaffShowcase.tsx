
import React from 'react';
import { StaffDirectory } from '../types';
import { ChefHatIcon } from './icons/ChefHatIcon';

interface StaffShowcaseProps {
  staff: StaffDirectory;
}

const StaffShowcase: React.FC<StaffShowcaseProps> = ({ staff }) => {
  if (!staff.isVisible) return null;

  const roles = [
    { key: 'griller', label: 'On The Grill', value: staff.griller },
    { key: 'fryCook', label: 'Fry Station', value: staff.fryCook },
    { key: 'drinkMaker', label: 'Drinks', value: staff.drinkMaker },
    { key: 'bakers', label: 'Bakery', value: staff.bakers },
    { key: 'cashier', label: 'Cashier', value: staff.cashier },
    { key: 'runners', label: 'Runners', value: staff.runners },
  ];

  // Only show roles that have names assigned
  const activeRoles = roles.filter(r => r.value && r.value.trim() !== '');

  if (activeRoles.length === 0) return null;

  return (
    <div 
        className="w-full rounded-xl p-6 mt-8 border-t-4"
        style={{
            backgroundColor: 'var(--color-card-background)',
            borderColor: 'var(--color-accent)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
        }}
    >
        <div className="flex items-center justify-center gap-2 mb-6 opacity-90">
            <ChefHatIcon className="w-6 h-6" style={{ color: 'var(--color-text-primary)' }} />
            <h3 className="text-xl uppercase tracking-widest font-bold" style={{ fontFamily: 'var(--font-header)', color: 'var(--color-text-primary)' }}>
                Today's Team
            </h3>
            <ChefHatIcon className="w-6 h-6" style={{ color: 'var(--color-text-primary)' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {activeRoles.map((role) => (
                <div key={role.key} className="flex flex-col items-center">
                    <span className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70" style={{ color: 'var(--color-text-secondary)' }}>
                        {role.label}
                    </span>
                    <span className="text-lg font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}>
                        {role.value}
                    </span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default StaffShowcase;
