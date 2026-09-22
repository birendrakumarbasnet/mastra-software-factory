'use client';

import { useState, useEffect } from 'react';
import { Item } from '@/lib/api';

interface ItemFormProps {
  editingItem: Item | null;
  onSubmit: (data: { name: string; description: string }) => void;
  onCancel: () => void;
}

export default function ItemForm({ editingItem, onSubmit, onCancel }: ItemFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setDescription(editingItem.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Name is required');
      return;
    }
    onSubmit({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingItem ? 'Edit Item' : 'Create New Item'}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter item name"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter item description (optional)"
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {editingItem ? 'Update' : 'Create'}
        </button>
        {editingItem && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
