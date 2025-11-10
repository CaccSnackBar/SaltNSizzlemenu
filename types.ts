export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  isCrossedOut?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Theme {
  id: string;
  name: string;
  category: 'daily' | 'palette' | 'holiday' | 'interactive';
  fontHeader: string;
  fontBody: string;
  colors: {
    background: string;
    cardBackground: string;
    textPrimary: string;
    textSecondary: string;
    header: string;
    cardBorder?: string;
    cardBoxShadow?: string;
  };
  specialEffect?: 'cosmic' | 'retro';
  sounds?: {
    change: string; // URL to sound file
    open: string;
    add: string;
  };
}