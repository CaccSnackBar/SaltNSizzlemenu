import React from 'react';

// Fix: Add style prop to allow for dynamic styling and fix a type error in MenuItem.tsx.
export const StarIcon = ({ className = 'w-6 h-6', style }: { className?: string; style?: React.CSSProperties }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);
