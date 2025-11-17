import React from 'react';

export const SaltShakerIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M14.5 9.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
        <path d="M17.5 9.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
        <path d="M16 3h-2a1 1 0 0 0-1 1v2h4V4a1 1 0 0 0-1-1Z" />
        <path d="M18 6H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" />
    </svg>
);
