
import { MenuCategory } from './types';

export const ADMIN_PASSWORD = 'sizzle';
export const LOCAL_STORAGE_KEY_MENU = 'salt-sizzle-menu';
export const LOCAL_STORAGE_KEY_THEME = 'salt-sizzle-theme';


export const INITIAL_MENU: MenuCategory[] = [
  {
    id: 'cat1',
    name: 'Breakfast',
    items: [
      {
        id: 'item1',
        name: 'Breakfast Burritos',
        price: '2 / $1.00',
        description: 'Bacon, Egg, and Cheese Burrito OR Sausage, Egg, and Cheese Burrito.'
      },
      {
        id: 'item2',
        name: 'Breakfast Sandwich',
        price: '$2.00',
        description: 'Bacon, Egg, and Cheese topped with a golden Biscuit.'
      },
      {
        id: 'item3',
        name: 'Bagel',
        price: '$1.00',
        description: 'Choice of Plain or Cinnamon Raisin.'
      }
    ]
  },
  {
    id: 'cat2',
    name: 'Lunch & Dinner',
    items: [
      {
        id: 'item4',
        name: 'Smash Burger',
        price: '$3.00',
        description: 'Smashed 3 oz ground beef patty, seasoned with salt, pepper, and garlic powder, topped with cheese and a toasted bun.\nToppings: Lettuce, Tomato, Pickle\nAdd a Patty - $1.00\nAdd Bacon - $1.00'
      },
      {
        id: 'item5',
        name: 'Walking Taco',
        price: '$3.00',
        description: 'Choice of Doritos or Fritos topped with seasoned ground beef.\nToppings: Cheese, Sour Cream, Salsa\nAdd Cheese Sauce - $1.00'
      }
    ]
  },
  {
    id: 'cat3',
    name: 'Sides',
    items: [
      {
        id: 'item6',
        name: 'French Fries',
        price: '$1.00',
        description: 'Crinkle cut potatoes, fried in vegetable oil, and seasoned with salt and pepper.'
      },
      {
        id: 'item7',
        name: 'Cheese Fries',
        price: '$2.00',
        description: "Bed of French fries, topped with Mrs. Hill's famous cheese sauce."
      },
      {
        id: 'item8',
        name: 'Loaded Fries',
        price: '$3.00',
        description: "Bed of French fries, topped with Mrs. Hill's famous cheese sauce, bacon, and jalapenos."
      }
    ]
  },
  {
    id: 'cat4',
    name: 'Drinks',
    items: [
      {
        id: 'item9',
        name: 'Soft Drink',
        price: 'Sm $1.00 / Lg $2.00',
        description: '1 FREE REFILL. Pepsi, Pepsi Zero, Pepsi Wild Cherry, Mtn. Dew, Orange Crush, Starry, Mug Root Beer, and Dr. Pepper.'
      },
      {
        id: 'item10',
        name: 'Slushie',
        price: 'Sm $2.00 / Lg $3.00',
        description: 'Blue Raspberry and Cherry Limeade.'
      }
    ]
  }
];