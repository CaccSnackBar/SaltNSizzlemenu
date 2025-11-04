
import { Theme } from './types';

export const THEMES: Theme[] = [
  {
    id: 'default-light',
    name: 'Default Light',
    colors: {
      background: '#e0e8e2',
      text: '#4a5568', // gray-700
      heading: '#2d3748', // gray-800
      cardBg: '#ffffff80', // white/50
      cardBorder: '#ffffff00', // transparent
    },
  },
  {
    id: 'midnight-chalk',
    name: 'Midnight Chalk',
    colors: {
      background: '#2d3748', // gray-800
      text: '#e2e8f0', // gray-200
      heading: '#ffffff',
      cardBg: '#4a5568', // gray-700
      cardBorder: '#718096', // gray-500
    },
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    colors: {
        background: '#ebf8ff', // blue-50
        text: '#2c5282', // blue-800
        heading: '#2a4365', // blue-900
        cardBg: '#ffffff',
        cardBorder: '#bee3f8', // blue-200
    }
  },
  {
    id: 'sunrise-diner',
    name: 'Sunrise Diner',
    colors: {
        background: '#fffaf0', // orange-50
        text: '#7b341e', // orange-900
        heading: '#c05621', // orange-700
        cardBg: '#fed7d7', // red-200
        cardBorder: '#feb2b2', // red-300
    }
  }
];
