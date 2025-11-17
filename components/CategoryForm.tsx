import React, { useState } from 'react';
import { MenuCategory } from '../types';

interface CategoryFormProps {
  categoryToEdit: MenuCategory | null;
  onSave: (category: { id: string, name: string }) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categoryToEdit, onSave, onCancel }) => {
  const [name, setName] = useState(categoryToEdit?.name || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
        alert("Category name is required.");
        return;
    }
    onSave({
      id: categoryToEdit?.id || `cat-${Date.now()}`,
      name,
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{categoryToEdit ? 'Edit Category' : 'Add New Category'}</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          autoFocus
        />
      </div>
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
