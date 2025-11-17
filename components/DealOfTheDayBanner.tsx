import React from 'react';
import { MegaphoneIcon } from './icons/MegaphoneIcon';

interface DealOfTheDayBannerProps {
  text: string;
}

const DealOfTheDayBanner: React.FC<DealOfTheDayBannerProps> = ({ text }) => {
  return (
    <>
      <style>{`
        @keyframes subtle-glow {
          0%, 100% {
            box-shadow: 0 0 8px 0px var(--color-accent);
          }
          50% {
            box-shadow: 0 0 16px 2px var(--color-accent);
          }
        }
      `}</style>
      <div 
        className="max-w-5xl mx-auto mb-8 p-4 rounded-xl flex items-center justify-center gap-4 text-center"
        style={{
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-background)',
          animation: 'subtle-glow 4s ease-in-out infinite'
        }}
      >
        <MegaphoneIcon className="w-8 h-8 flex-shrink-0" />
        <p className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-header)' }}>
          {text}
        </p>
      </div>
    </>
  );
};

export default DealOfTheDayBanner;