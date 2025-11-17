import React from 'react';

export const MegaphoneIcon = ({ className = 'w-6 h-6', style }: { className?: string; style?: React.CSSProperties }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
);
