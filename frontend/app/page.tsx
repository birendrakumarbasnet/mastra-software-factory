'use client';

import { useState, useEffect } from 'react';
import { itemsApi, Item } from '@/lib/api';
import ItemList from '@/components/ItemList';
import ItemForm from '@/components/ItemForm';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await itemsApi.getAll();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: { name: string; description: string }) => {
    try {
      setError(null);
      if (editingItem) {
        await itemsApi.update(editingItem._id, data);
      } else {
        await itemsApi.create(data);
      }
      setEditingItem(null);
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save item');
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }
    try {
      setError(null);
      await itemsApi.delete(id);
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Full Stack App - Items Manager
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <ItemForm
          editingItem={editingItem}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : (
          <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
