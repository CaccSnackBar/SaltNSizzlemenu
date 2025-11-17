import React from 'react';

// Fix: Add style prop to allow for dynamic styling and fix a type error in FullScreenMenu.tsx.
export const CloseIcon = ({ className = 'w-6 h-6', style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
