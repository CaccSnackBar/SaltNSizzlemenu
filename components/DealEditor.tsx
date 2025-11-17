import React, { useState, useEffect } from 'react';
import { DealOfTheDay } from '../types';
import { MegaphoneIcon } from './icons/MegaphoneIcon';

interface DealEditorProps {
  currentDeal: DealOfTheDay;
  onSave: (deal: DealOfTheDay) => void;
}

const DealEditor: React.FC<DealEditorProps> = ({ currentDeal, onSave }) => {
  const [text, setText] = useState(currentDeal.text);
  const [isVisible, setIsVisible] = useState(currentDeal.isVisible);

  // Update local state if the prop changes from another tab
  useEffect(() => {
    setText(currentDeal.text);
    setIsVisible(currentDeal.isVisible);
  }, [currentDeal]);

  const handleSave = () => {
    onSave({ text, isVisible });
  };

  const handleToggle = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    onSave({ text, isVisible: newVisibility });
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
            <MegaphoneIcon className="w-6 h-6" style={{ color: 'var(--color-text-primary)' }} />
            <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-header)', color: 'var(--color-text-primary)' }}>
                Special Announcement
            </h3>
        </div>
        <div 
            onClick={handleToggle} 
            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${isVisible ? 'bg-green-500' : 'bg-gray-400'}`}
        >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isVisible ? 'translate-x-6' : ''}`}></div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., Today's Special: 2-for-1!"
          className="flex-grow px-3 py-2 rounded-md transition-colors"
          style={{
             backgroundColor: 'var(--color-background)',
             border: '1px solid var(--color-card-border)',
             color: 'var(--color-text-primary)'
          }}
        />
        <button
          onClick={handleSave}
          className="px-5 py-2 font-semibold rounded-md transition-opacity hover:opacity-80"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-background)'
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DealEditor;
