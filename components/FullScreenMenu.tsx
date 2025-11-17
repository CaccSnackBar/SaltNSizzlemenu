import React from 'react';
import { MenuCategory, MenuItem as MenuItemType, DealOfTheDay } from '../types';
import Marquee from './Marquee';
import { CloseIcon } from './icons/CloseIcon';
import DealOfTheDayBanner from './DealOfTheDayBanner';
import ComboDeal from './ComboDeal';

interface FullScreenMenuProps {
  menu: MenuCategory[];
  deal: DealOfTheDay;
  comboItems: MenuItemType[];
  onClose: () => void;
}

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ menu, deal, comboItems, onClose }) => {
  return (
    <>
      {/* Add custom scrollbar styles to make it less obtrusive and match the theme */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--color-text-secondary);
          opacity: 0.6;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          opacity: 0.9;
        }
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: var(--color-text-secondary) transparent;
        }
      `}</style>
      <div 
        className="fixed inset-0 p-4 md:p-8 overflow-y-auto z-50 flex flex-col custom-scrollbar" 
        style={{ 
          backgroundColor: 'var(--color-background)', 
          color: 'var(--color-text-primary)' 
        }}
      >
        <div className="w-full max-w-screen-2xl mx-auto flex-grow flex flex-col">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-8 md:mb-12" style={{ fontFamily: 'var(--font-header)', color: 'var(--color-text-primary)' }}>
            SALT & SIZZLE
          </h1>

          {deal.isVisible && (
            <div className="mb-8 md:mb-12">
              <DealOfTheDayBanner text={deal.text} />
            </div>
          )}
          
          {comboItems.length > 0 && (
            <div className="mb-8 md:mb-12">
              <ComboDeal items={comboItems} />
            </div>
          )}
          
          <div className="grid flex-grow w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
            {menu.map(category => (
              <div key={category.id} className="flex flex-col" style={{ breakInside: 'avoid' }}>
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 pb-2" style={{ fontFamily: 'var(--font-header)', color: 'var(--color-text-primary)', borderBottom: '2px solid var(--color-card-border)' }}>
                  {category.name}
                </h2>
                <ul className="space-y-4" style={{ fontFamily: 'var(--font-body)' }}>
                  {category.items.map(item => (
                    <li key={item.id} className={`transition-opacity ${item.isCrossedOut ? 'opacity-40' : ''}`}>
                      <div className="flex justify-between items-baseline gap-4">
                        <span className={`text-xl md:text-2xl ${item.isCrossedOut ? 'line-through' : ''}`}>
                          {item.name}
                        </span>
                        <span className="text-xl md:text-2xl font-semibold flex-shrink-0 text-right" style={{ color: 'var(--color-accent)' }}>
                          {item.price}
                        </span>
                      </div>
                      {item.description && !item.isCrossedOut && (
                          <p className="text-base md:text-lg mt-1 whitespace-pre-line" style={{ color: 'var(--color-text-secondary)' }}>
                              {item.description}
                          </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-auto pt-8">
          <Marquee text="Thank you for visiting! Check out our specials! Don't forget dessert!" />
        </div>
        <button onClick={onClose} className="fixed top-4 right-4 p-2 rounded-full transition-opacity group" aria-label="Close fullscreen">
          <CloseIcon 
              className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" 
              style={{ color: 'var(--color-text-primary)' }}
          />
        </button>
      </div>
    </>
  );
};

export default FullScreenMenu;