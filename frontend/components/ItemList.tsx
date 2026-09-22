'use client';

import { Item } from '@/lib/api';

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

export default function ItemList({ items, onEdit, onDelete }: ItemListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No items yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item._id}
          className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              {item.description && (
                <p className="text-gray-600 mt-1">{item.description}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Created: {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEdit(item)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item._id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
