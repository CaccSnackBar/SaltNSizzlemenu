
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
