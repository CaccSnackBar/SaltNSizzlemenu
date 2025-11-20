
import { Theme } from './types';

export const themes: Theme[] = [
  // --- Daily Drivers ---
  {
    id: 'default',
    name: 'Classic Light',
    category: 'daily',
    colors: {
      background: '#e0e8e2',
      header: 'rgba(243, 244, 246, 0.8)',
      textPrimary: '#1f2937',
      textSecondary: '#374151', // Darkened for better contrast
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      cardBorder: '#d1d5db',
      accent: '#8c6d52',
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Roboto', sans-serif",
    sound: {
        click: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAABoAAAAAAAAAABpAAAAAAAAAABsAAAAAAAAAABpAAAAAAAAAAACVGFsYgAAAAAAAAD+/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/80DEAAAAA0gAAABEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV-CQAAAAAAAAAAAAD/80DEAB8AAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVJAP/zkAAAAAAAAAAAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV-CQAAAAAAAAAAAAD/gAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV-CQAAAAAAAAAAAAA',
        toggle: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjQwLjEwMQAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAABoAAAAAAAAAABpAAAAAAAAAABsAAAAAAAAAABpAAAAAAAAAAACVGFsYgAAAAAAAAD+/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/80DEAAAAA0gAAABEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV-CQAAAAAAAAAAAAD/80DEAB8AAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVJAP/zkAAAAAAAAAAAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV-CQAAAAAAAAAAAAD/gAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV-CQAAAAAAAAAAAAA',
    }
  },
  {
    id: 'dark',
    name: 'Midnight',
    category: 'daily',
    colors: {
      background: '#0d1117',
      header: 'rgba(22, 27, 34, 0.8)',
      textPrimary: '#c9d1d9',
      textSecondary: '#8b949e',
      cardBackground: 'rgba(22, 27, 34, 0.7)',
      cardBorder: '#30363d',
      accent: '#58a6ff',
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'ocean',
    name: 'Ocean Deep',
    category: 'daily',
    colors: {
      background: '#001f3f',
      header: 'rgba(0, 31, 63, 0.8)',
      textPrimary: '#f0f8ff',
      textSecondary: '#b0c4de',
      cardBackground: 'rgba(70, 130, 180, 0.2)',
      cardBorder: '#1e90ff',
      accent: '#7FDBFF',
    },
    fontHeader: "'Montserrat', sans-serif",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'nightfall',
    name: 'Nightfall',
    category: 'daily',
    colors: {
      background: '#1c2541',
      header: 'rgba(48, 56, 83, 0.8)',
      textPrimary: '#d3d8e8',
      textSecondary: '#8d99ae',
      cardBackground: 'rgba(48, 56, 83, 0.5)',
      cardBorder: '#5c6784',
      accent: '#fca311',
    },
    fontHeader: "'Montserrat', sans-serif",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'peachy',
    name: 'Peachy Keen',
    category: 'daily',
    colors: {
      background: '#fff3e0',
      header: 'rgba(255, 171, 145, 0.8)',
      textPrimary: '#bf360c',
      textSecondary: '#d84315',
      cardBackground: 'rgba(255, 224, 178, 0.5)',
      cardBorder: '#ffcc80',
      accent: '#ff6e40',
    },
    fontHeader: "'Lobster', cursive",
    fontBody: "'Lato', sans-serif",
  },

  // --- Color Palettes ---
  {
    id: 'cafe',
    name: 'Coffee Shop',
    category: 'palette',
    colors: {
        background: '#f1e8e0',
        header: 'rgba(111, 78, 55, 0.8)',
        textPrimary: '#3e2723',
        textSecondary: '#5d4037', // Darkened
        cardBackground: 'rgba(255, 255, 255, 0.6)',
        cardBorder: '#d7ccc8',
        accent: '#8d6e63',
    },
    fontHeader: "'Lobster', cursive",
    fontBody: "'Montserrat', sans-serif",
  },
  {
    id: 'paper',
    name: 'Paper',
    category: 'palette',
    colors: {
      background: '#fdf6e3',
      header: 'rgba(245, 245, 220, 0.8)',
      textPrimary: '#455a64', // Darkened
      textSecondary: '#546e7a', // Darkened
      cardBackground: 'rgba(255, 251, 237, 0.7)',
      cardBorder: '#eee8d5',
      accent: '#cb4b16',
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'blackboard',
    name: 'Blackboard',
    category: 'palette',
    colors: {
        background: '#2d3436',
        header: 'rgba(45, 52, 54, 0.8)',
        textPrimary: '#dfe6e9',
        textSecondary: '#b2bec3',
        cardBackground: 'rgba(99, 110, 114, 0.2)',
        cardBorder: '#636e72',
        accent: '#fdcb6e',
    },
    fontHeader: "'Dancing Script', cursive",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'grey',
    name: 'Minimalist Grey',
    category: 'palette',
    colors: {
      background: '#f5f5f5',
      header: 'rgba(250, 250, 250, 0.8)',
      textPrimary: '#212121',
      textSecondary: '#424242', // Darkened
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      cardBorder: '#eeeeee',
      accent: '#616161',
    },
    fontHeader: "'Montserrat', sans-serif",
    fontBody: "'Roboto', sans-serif",
  },
    {
    id: 'sunset',
    name: 'Sunset',
    category: 'palette',
    colors: {
        background: '#2c2a4a',
        header: 'rgba(79, 74, 110, 0.8)',
        textPrimary: '#f5f5f5',
        textSecondary: '#d8b4fe',
        cardBackground: 'rgba(79, 74, 110, 0.5)',
        cardBorder: '#a855f7',
        accent: '#f97316',
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'spring',
    name: 'Spring Bloom',
    category: 'palette',
    colors: {
        background: '#f0fdf4',
        header: 'rgba(220, 252, 231, 0.8)',
        textPrimary: '#14532d',
        textSecondary: '#166534',
        cardBackground: 'rgba(255, 255, 255, 0.7)',
        cardBorder: '#86efac',
        accent: '#f472b6',
    },
    fontHeader: "'Dancing Script', cursive",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'royal',
    name: 'Royal Velvet',
    category: 'palette',
    colors: {
      background: '#311b92',
      header: 'rgba(49, 27, 146, 0.9)',
      textPrimary: '#ede7f6',
      textSecondary: '#b39ddb',
      cardBackground: 'rgba(69, 39, 160, 0.6)',
      cardBorder: '#512da8',
      accent: '#ffd700', // Gold
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Montserrat', sans-serif",
  },
  
  // --- Nature's Palette ---
  {
    id: 'forest',
    name: 'Forest Retreat',
    category: 'nature',
    colors: {
      background: '#3d403a',
      header: 'rgba(61, 64, 58, 0.8)',
      textPrimary: '#e8e6e3',
      textSecondary: '#c7c4bf', // Slightly lighter for better contrast on dark bg
      cardBackground: 'rgba(81, 85, 78, 0.5)',
      cardBorder: '#6d706a',
      accent: '#a3b18a',
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'autumn',
    name: 'Autumn Grove',
    category: 'nature',
    colors: {
      background: '#f3e5d8',
      header: 'rgba(141, 110, 99, 0.8)',
      textPrimary: '#3e2723', // Darkened
      textSecondary: '#5d4037', // Darkened
      cardBackground: 'rgba(255, 248, 240, 0.7)',
      cardBorder: '#bcaaa4',
      accent: '#bf360c',
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'misty',
    name: 'Misty Mountain',
    category: 'nature',
    colors: {
      background: '#d8e2ec',
      header: 'rgba(120, 144, 156, 0.8)',
      textPrimary: '#263238', // Darkened significantly
      textSecondary: '#455a64', // Darkened significantly
      cardBackground: 'rgba(236, 239, 241, 0.7)',
      cardBorder: '#90a4ae', // Darkened
      accent: '#00897b', // Darkened for contrast
    },
    fontHeader: "'Montserrat', sans-serif",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'dune',
    name: 'Desert Dune',
    category: 'nature',
    colors: {
      background: '#fdf0d5',
      header: 'rgba(224, 171, 114, 0.8)',
      textPrimary: '#3e2723', // Darkened significantly
      textSecondary: '#5d4037', // Darkened significantly
      cardBackground: 'rgba(255, 250, 240, 0.7)',
      cardBorder: '#d7ccc8',
      accent: '#bf360c', // More vibrant/darker orange
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'reef',
    name: 'Coral Reef',
    category: 'nature',
    colors: {
      background: '#e0f7fa',
      header: 'rgba(77, 208, 225, 0.8)',
      textPrimary: '#006064',
      textSecondary: '#00838f',
      cardBackground: 'rgba(240, 253, 255, 0.7)',
      cardBorder: '#4dd0e1',
      accent: '#d84315', // Darker orange
    },
    fontHeader: "'Montserrat', sans-serif",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'redwood',
    name: 'Redwood Canopy',
    category: 'nature',
    colors: {
      background: '#3e4444',
      header: 'rgba(92, 64, 51, 0.8)',
      textPrimary: '#f2f1ef',
      textSecondary: '#d7d6d5',
      cardBackground: 'rgba(92, 64, 51, 0.4)',
      cardBorder: '#7d5a4d',
      accent: '#82a368',
    },
    fontHeader: "'Lobster', cursive",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'arctic',
    name: 'Arctic Dawn',
    category: 'nature',
    colors: {
      background: '#f0f4f8',
      header: 'rgba(176, 190, 197, 0.8)',
      textPrimary: '#263238', // Darkened
      textSecondary: '#455a64', // Darkened
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      cardBorder: '#b0bec5',
      accent: '#d81b60', // Darker pink
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'lavender',
    name: 'Lavender Fields',
    category: 'nature',
    colors: {
      background: '#f3e5f5',
      header: 'rgba(123, 31, 162, 0.8)',
      textPrimary: '#4a148c',
      textSecondary: '#7b1fa2',
      cardBackground: 'rgba(255, 255, 255, 0.6)',
      cardBorder: '#e1bee7',
      accent: '#8e24aa',
    },
    fontHeader: "'Dancing Script', cursive",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'storm',
    name: 'Stormy Sky',
    category: 'nature',
    colors: {
      background: '#37474f',
      header: 'rgba(55, 71, 79, 0.9)',
      textPrimary: '#eceff1',
      textSecondary: '#b0bec5',
      cardBackground: 'rgba(38, 50, 56, 0.6)',
      cardBorder: '#546e7a',
      accent: '#ffab00', // Electric yellow/orange for lightning feel
    },
    fontHeader: "'Montserrat', sans-serif",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'moss',
    name: 'Mossy Rock',
    category: 'nature',
    colors: {
      background: '#33691e', // Dark green
      header: 'rgba(27, 94, 32, 0.8)',
      textPrimary: '#f1f8e9',
      textSecondary: '#c5e1a5',
      cardBackground: 'rgba(51, 105, 30, 0.5)',
      cardBorder: '#558b2f',
      accent: '#aeea00', // Bright lime
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Lato', sans-serif",
  },

  // --- Urban Vibes ---
  {
    id: 'neon',
    name: 'Downtown Neon',
    category: 'urban',
    colors: {
      background: '#1a1a2e',
      header: 'rgba(23, 23, 43, 0.8)',
      textPrimary: '#e0e0e0',
      textSecondary: '#9a9a9a',
      cardBackground: 'rgba(40, 40, 60, 0.7)',
      cardBorder: '#e94560',
      accent: '#00f5d4',
    },
    fontHeader: "'Bangers', cursive",
    fontBody: "'VT323', monospace",
  },
  {
    id: 'cobblestone',
    name: 'Cobblestone',
    category: 'urban',
    colors: {
      background: '#596e79',
      header: 'rgba(42, 53, 59, 0.8)',
      textPrimary: '#fdfbf7', // Lightened
      textSecondary: '#d7ccc8', // Lightened
      cardBackground: 'rgba(42, 53, 59, 0.5)',
      cardBorder: '#718894',
      accent: '#ffa000',
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'subway',
    name: 'Subway Steel',
    category: 'urban',
    colors: {
      background: '#dcdcdc',
      header: 'rgba(169, 169, 169, 0.8)',
      textPrimary: '#212121', // Darkened
      textSecondary: '#424242', // Darkened
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      cardBorder: '#9e9e9e',
      accent: '#d84315',
    },
    fontHeader: "'Montserrat', sans-serif",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'rooftop',
    name: 'Rooftop Garden',
    category: 'urban',
    colors: {
      background: '#edf6f9',
      header: 'rgba(129, 178, 154, 0.8)',
      textPrimary: '#004d40', // Darkened
      textSecondary: '#00695c', // Darkened
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      cardBorder: '#81b29a',
      accent: '#d84315',
    },
    fontHeader: "'Dancing Script', cursive",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'concrete',
    name: 'Concrete Jungle',
    category: 'urban',
    colors: {
      background: '#cfd8dc',
      header: 'rgba(84, 110, 122, 0.8)',
      textPrimary: '#263238',
      textSecondary: '#455a64',
      cardBackground: 'rgba(255, 255, 255, 0.5)',
      cardBorder: '#90a4ae',
      accent: '#d84315', // Industrial orange
    },
    fontHeader: "'Bangers', cursive",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk City',
    category: 'urban',
    colors: {
      background: '#050505',
      header: 'rgba(20, 20, 20, 0.9)',
      textPrimary: '#00e5ff', // Cyan
      textSecondary: '#ea00d9', // Magenta
      cardBackground: 'rgba(30, 30, 30, 0.8)',
      cardBorder: '#00e5ff',
      accent: '#f50057',
    },
    fontHeader: "'Press Start 2P', cursive",
    fontBody: "'VT323', monospace",
  },

  // --- Gourmet ---
  {
    id: 'matcha',
    name: 'Matcha',
    category: 'gourmet',
    colors: {
      background: '#e5f3e4',
      header: 'rgba(163, 177, 138, 0.8)',
      textPrimary: '#1b4d3e', // Darkened
      textSecondary: '#2d6a4f', // Darkened
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      cardBorder: '#a3b18a',
      accent: '#1b4d3e',
    },
    fontHeader: "'Dancing Script', cursive",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'berry',
    name: 'Berry Bliss',
    category: 'gourmet',
    colors: {
      background: '#f8e1f4',
      header: 'rgba(224, 150, 186, 0.8)',
      textPrimary: '#4a1942',
      textSecondary: '#880e4f', // Darkened
      cardBackground: 'rgba(255, 240, 251, 0.7)',
      cardBorder: '#e096ba',
      accent: '#c2185b',
    },
    fontHeader: "'Lobster', cursive",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'chocolate',
    name: 'Dark Chocolate',
    category: 'gourmet',
    colors: {
      background: '#3c2f2f',
      header: 'rgba(60, 47, 47, 0.8)',
      textPrimary: '#fff0e6',
      textSecondary: '#e6ceca',
      cardBackground: 'rgba(94, 75, 75, 0.5)',
      cardBorder: '#7a5c58',
      accent: '#ff8a65',
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Montserrat', sans-serif",
  },
  {
    id: 'citrus',
    name: 'Citrus Zest',
    category: 'gourmet',
    colors: {
      background: '#fffbeb',
      header: 'rgba(252, 211, 77, 0.8)',
      textPrimary: '#78350f',
      textSecondary: '#92400e', // Darkened
      cardBackground: 'rgba(255, 255, 255, 0.8)',
      cardBorder: '#fde68a',
      accent: '#16a34a',
    },
    fontHeader: "'Bangers', cursive",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'salsa',
    name: 'Spicy Salsa',
    category: 'gourmet',
    colors: {
      background: '#ffebee',
      header: 'rgba(198, 40, 40, 0.8)',
      textPrimary: '#b71c1c',
      textSecondary: '#d32f2f',
      cardBackground: 'rgba(255, 205, 210, 0.6)',
      cardBorder: '#ef9a9a',
      accent: '#ff6f00',
    },
    fontHeader: "'Lobster', cursive",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'blueberry',
    name: 'Blueberry Tart',
    category: 'gourmet',
    colors: {
      background: '#e8eaf6',
      header: 'rgba(63, 81, 181, 0.8)',
      textPrimary: '#1a237e',
      textSecondary: '#283593',
      cardBackground: 'rgba(197, 202, 233, 0.6)',
      cardBorder: '#9fa8da',
      accent: '#ff4081',
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Lato', sans-serif",
  },
   {
    id: 'honey',
    name: 'Honey Comb',
    category: 'gourmet',
    colors: {
      background: '#fff8e1',
      header: 'rgba(255, 160, 0, 0.8)',
      textPrimary: '#4e342e', // Dark brown
      textSecondary: '#6d4c41',
      cardBackground: 'rgba(255, 236, 179, 0.6)',
      cardBorder: '#ffe082',
      accent: '#ff6f00',
    },
    fontHeader: "'Dancing Script', cursive",
    fontBody: "'Montserrat', sans-serif",
  },

  // --- Vintage ---
  {
    id: 'seventies',
    name: "'70s Groove",
    category: 'vintage',
    colors: {
      background: '#f4a261',
      header: 'rgba(231, 111, 81, 0.8)',
      textPrimary: '#264653',
      textSecondary: '#1d3557', // Dark blue for contrast
      cardBackground: 'rgba(255, 234, 210, 0.7)',
      cardBorder: '#e9c46a',
      accent: '#e76f51',
    },
    fontHeader: "'Bangers', cursive",
    fontBody: "'Montserrat', sans-serif",
  },
  {
    id: 'artdeco',
    name: 'Art Deco',
    category: 'vintage',
    colors: {
      background: '#232931',
      header: 'rgba(52, 60, 69, 0.8)',
      textPrimary: '#eeeeee',
      textSecondary: '#d4af37',
      cardBackground: 'rgba(52, 60, 69, 0.5)',
      cardBorder: '#4ecca3',
      accent: '#d4af37',
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'steampunk',
    name: 'Steampunk',
    category: 'vintage',
    colors: {
      background: '#8c6d52',
      header: 'rgba(78, 52, 46, 0.8)',
      textPrimary: '#ece0d1',
      textSecondary: '#ffecb3', // Lighter for contrast against dark bg
      cardBackground: 'rgba(78, 52, 46, 0.5)',
      cardBorder: '#c89f7a',
      accent: '#ffb74d',
    },
    fontHeader: "'Lobster', cursive",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'library',
    name: 'Old Library',
    category: 'vintage',
    colors: {
      background: '#f5f0e1',
      header: 'rgba(90, 50, 40, 0.8)',
      textPrimary: '#3a2e2c',
      textSecondary: '#4e342e', // Darkened
      cardBackground: 'rgba(253, 250, 242, 0.7)',
      cardBorder: '#e4d9c8',
      accent: '#1b5e20',
    },
    fontHeader: "'Lobster', cursive",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'vinyl',
    name: 'Vinyl Record',
    category: 'vintage',
    colors: {
      background: '#212121',
      header: 'rgba(0, 0, 0, 0.8)',
      textPrimary: '#e0e0e0',
      textSecondary: '#9e9e9e',
      cardBackground: 'rgba(48, 48, 48, 0.6)',
      cardBorder: '#424242',
      accent: '#00bcd4', // Retro blue
    },
    fontHeader: "'Bangers', cursive",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'newsprint',
    name: 'Old Newsprint',
    category: 'vintage',
    colors: {
      background: '#f5f5f5',
      header: 'rgba(33, 33, 33, 0.8)',
      textPrimary: '#212121',
      textSecondary: '#424242',
      cardBackground: 'rgba(224, 224, 224, 0.6)',
      cardBorder: '#9e9e9e',
      accent: '#d50000', // Red ink
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'VT323', monospace",
  },


  // --- Holiday Themes ---
  {
    id: 'halloween',
    name: 'Spooky Halloween',
    category: 'holiday',
    colors: {
      background: '#121212',
      header: 'rgba(255, 107, 0, 0.8)',
      textPrimary: '#fdfdfd',
      textSecondary: '#e0e0e0',
      cardBackground: 'rgba(34, 34, 34, 0.7)',
      cardBorder: '#444444',
      accent: '#ff6b00',
    },
    fontHeader: "'Creepster', cursive",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'christmas',
    name: 'Jolly Christmas',
    category: 'holiday',
    colors: {
      background: '#f2e9e4',
      header: 'rgba(187, 0, 0, 0.8)',
      textPrimary: '#0a4f0a',
      textSecondary: '#1b5e20', // Darkened
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      cardBorder: '#e0e0e0',
      accent: '#c49a4a',
    },
    fontHeader: "'Lobster', cursive",
    fontBody: "'Montserrat', sans-serif",
  },
  {
    id: 'valentines',
    name: 'Valentine\'s Kiss',
    category: 'holiday',
    colors: {
      background: '#ffebee',
      header: 'rgba(255, 205, 210, 0.8)',
      textPrimary: '#880e4f', // Darkened
      textSecondary: '#ad1457', // Darkened
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      cardBorder: '#f8bbd0',
      accent: '#d81b60',
    },
    fontHeader: "'Dancing Script', cursive",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'stpatricks',
    name: 'Lucky Shamrock',
    category: 'holiday',
    colors: {
      background: '#e8f5e9',
      header: 'rgba(165, 214, 167, 0.8)',
      textPrimary: '#1b5e20',
      textSecondary: '#2e7d32',
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      cardBorder: '#c8e6c9',
      accent: '#f57f17',
    },
    fontHeader: "'Montserrat', sans-serif",
    fontBody: "'Roboto', sans-serif",
  },
  {
    id: 'july4',
    name: 'Freedom Rings',
    category: 'holiday',
    colors: {
      background: '#f1f2f6',
      header: 'rgba(179, 25, 66, 0.8)', // Red
      textPrimary: '#192a56', // Dark Blue
      textSecondary: '#273c75', // Lighter Dark Blue
      cardBackground: 'rgba(255, 255, 255, 0.8)',
      cardBorder: '#dcdde1',
      accent: '#0057b8', // Blue
    },
    fontHeader: "'Bangers', cursive",
    fontBody: "'Lato', sans-serif",
  },
  {
    id: 'thanksgiving',
    name: 'Thanksgiving',
    category: 'holiday',
    colors: {
        background: '#fef3c7',
        header: 'rgba(217, 119, 6, 0.8)',
        textPrimary: '#451a03', // Darkened
        textSecondary: '#78350f',
        cardBackground: 'rgba(255, 255, 255, 0.7)',
        cardBorder: '#fcd34d',
        accent: '#b91c1c',
    },
    fontHeader: "'Playfair Display', serif",
    fontBody: "'Roboto', sans-serif",
  },
    {
    id: 'newyear',
    name: 'New Year\'s Eve',
    category: 'holiday',
    colors: {
        background: '#111827',
        header: 'rgba(31, 41, 55, 0.8)',
        textPrimary: '#f9fafb',
        textSecondary: '#d1d5db',
        cardBackground: 'rgba(55, 65, 81, 0.5)',
        cardBorder: '#9ca3af',
        accent: '#facc15',
    },
    fontHeader: "'Lobster', cursive",
    fontBody: "'Montserrat', sans-serif",
  },

  // --- Interactive Themes ---
  {
    id: 'cosmic',
    name: 'Cosmic',
    category: 'interactive',
    colors: {
      background: '#000000',
      header: 'rgba(17, 24, 39, 0.8)',
      textPrimary: '#ffffff',
      textSecondary: '#9ca3af',
      cardBackground: 'rgba(17, 24, 39, 0.7)',
      cardBorder: '#4b5563',
      accent: '#a78bfa',
    },
    fontHeader: "'Montserrat', sans-serif",
    fontBody: "'Lato', sans-serif",
    backgroundEffect: 'cosmic',
  },
  {
    id: 'konami',
    name: 'Konami',
    category: 'interactive',
    colors: {
      background: '#0d0221',
      header: 'rgba(252, 58, 118, 0.8)',
      textPrimary: '#f0f2f5',
      textSecondary: '#935de5',
      cardBackground: 'rgba(17, 10, 39, 0.7)',
      cardBorder: '#935de5',
      accent: '#05fdd8',
    },
    fontHeader: "'Press Start 2P', cursive",
    fontBody: "'VT323', monospace",
    backgroundEffect: 'retro'
  },
];
