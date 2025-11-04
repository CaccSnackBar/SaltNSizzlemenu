import { getDeployStore } from '@netlify/blobs';
import { INITIAL_MENU, ADMIN_PASSWORD } from '../../src/constants';
import type { MenuCategory } from '../../src/types';

const MENU_KEY = 'current-menu';

export default async (req: Request) => {
  const store = getDeployStore();

  // Handle GET request to fetch the menu
  if (req.method === 'GET') {
    try {
      const menu = await store.get(MENU_KEY, { type: 'json' });
      if (!menu) {
        // If no menu is in the store, initialize it with the default
        await store.setJSON(MENU_KEY, INITIAL_MENU);
        return new Response(JSON.stringify(INITIAL_MENU), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify(menu), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error fetching menu:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch menu' }), { status: 500 });
    }
  }

  // Handle POST request to update the menu
  if (req.method === 'POST') {
    try {
      const { password, menu } = (await req.json()) as { password: string; menu: MenuCategory[] };

      // Password protect the update operation
      if (password !== ADMIN_PASSWORD) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }

      if (!menu) {
        return new Response(JSON.stringify({ error: 'Menu data is required' }), { status: 400 });
      }

      await store.setJSON(MENU_KEY, menu);

      return new Response(JSON.stringify({ success: true, menu }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error updating menu:', error);
      return new Response(JSON.stringify({ error: 'Failed to update menu' }), { status: 500 });
    }
  }

  // Handle other methods
  return new Response('Method Not Allowed', { status: 405 });
};
