
export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  isCrossedOut?: boolean;
  isFeatured?: boolean;
  tags?: ('spicy' | 'vegetarian' | 'gluten-free' | 'new')[];
}

export interface MenuCategory {
  id:string;
  name: string;
  items: MenuItem[];
}

export interface Theme {
  id: string;
  name: string;
  category: 'daily' | 'palette' | 'holiday' | 'interactive' | 'nature' | 'urban' | 'vintage' | 'gourmet';
  colors: {
    background: string;
    header: string;
    textPrimary: string;
    textSecondary: string;
    cardBackground: string;
    cardBorder?: string;
    accent: string;
  };
  fontHeader: string;
  fontBody: string;
  sound?: {
    click?: string;
    toggle?: string;
  };
  backgroundEffect?: 'cosmic' | 'retro';
}

export interface DealOfTheDay {
  text: string;
  isVisible: boolean;
}

export interface StaffDirectory {
  isVisible: boolean;
  griller: string;
  fryCook: string;
  drinkMaker: string;
  bakers: string;
  cashier: string;
  runners: string;
}
