import { Theme } from './types';

export const themes: Theme[] = [
  {
    id: 'tuesday',
    name: 'Default Green',
    colors: {
      background: '#e0e8e2',
      cardBackground: 'rgba(255, 255, 255, 0.5)',
      textPrimary: '#2d3748',
      textSecondary: '#4a5568',
      header: '#2f855a',
    },
  },
  {
    id: 'monday',
    name: 'Calm Blue',
    colors: {
      background: '#e0e8f0',
      cardBackground: 'rgba(255, 255, 255, 0.6)',
      textPrimary: '#2d3748',
      textSecondary: '#4a5568',
      header: '#1a365d',
    },
  },
  {
    id: 'wednesday',
    name: 'Warm Yellow',
    colors: {
      background: '#fef3c7',
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      textPrimary: '#422006',
      textSecondary: '#6b4618',
      header: '#92400e',
    },
  },
  {
    id: 'thursday',
    name: 'Toasty Orange',
    colors: {
      background: '#ffedd5',
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      textPrimary: '#432818',
      textSecondary: '#6f4e37',
      header: '#78350f',
    },
  },
  {
    id: 'friday',
    name: 'Vibrant Purple',
    colors: {
      background: '#fae8ff',
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      textPrimary: '#4c1d95',
      textSecondary: '#6d28d9',
      header: '#5b21b6',
    },
  },
];
