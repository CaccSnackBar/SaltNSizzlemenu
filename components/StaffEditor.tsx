
import React, { useState, useEffect } from 'react';
import { StaffDirectory } from '../types';
import { ChefHatIcon } from './icons/ChefHatIcon';

interface StaffEditorProps {
  staff: StaffDirectory;
  onSave: (staff: StaffDirectory) => void;
}

const StaffEditor: React.FC<StaffEditorProps> = ({ staff, onSave }) => {
  const [localStaff, setLocalStaff] = useState(staff);

  useEffect(() => {
    setLocalStaff(staff);
  }, [staff]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedStaff = { ...localStaff, [name]: value };
    setLocalStaff(updatedStaff);
    onSave(updatedStaff);
  };

  const toggleVisibility = () => {
    const updatedStaff = { ...localStaff, isVisible: !localStaff.isVisible };
    setLocalStaff(updatedStaff);
    onSave(updatedStaff);
  };

  return (
    <div 
        className="rounded-xl shadow-lg p-5"
        style={{
          backgroundColor: 'var(--color-card-background)',
          border: '1px solid var(--color-card-border)',
        }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
            <ChefHatIcon className="w-6 h-6" style={{ color: 'var(--color-text-primary)' }} />
            <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-header)', color: 'var(--color-text-primary)' }}>
                Student Spotlight / Staff
            </h3>
        </div>
        <div 
            onClick={toggleVisibility} 
            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${localStaff.isVisible ? 'bg-green-500' : 'bg-gray-400'}`}
        >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${localStaff.isVisible ? 'translate-x-6' : ''}`}></div>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300 ${localStaff.isVisible ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
        {[
          { key: 'griller', label: 'Grill Master (Burgers/Hotdogs)' },
          { key: 'fryCook', label: 'Fry Maker' },
          { key: 'drinkMaker', label: 'Drink Maker' },
          { key: 'bakers', label: 'Bakers' },
          { key: 'cashier', label: 'Cashier' },
          { key: 'runners', label: 'Runners' },
        ].map((role) => (
          <div key={role.key}>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              {role.label}
            </label>
            <input
              type="text"
              name={role.key}
              value={localStaff[role.key as keyof StaffDirectory] as string}
              onChange={handleChange}
              placeholder="Enter student name(s)..."
              className="w-full px-3 py-2 rounded-md transition-colors"
              style={{
                 backgroundColor: 'var(--color-background)',
                 border: '1px solid var(--color-card-border)',
                 color: 'var(--color-text-primary)'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffEditor;
