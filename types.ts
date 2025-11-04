
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
  colors: {
    background: string;
    text: string;
    heading: string;
    cardBg: string;
    cardBorder: string;
  };
}
