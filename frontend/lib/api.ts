const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Item {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemData {
  name: string;
  description?: string;
}

export interface UpdateItemData {
  name?: string;
  description?: string;
}

async function fetchApi(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP ${response.status}: ${response.statusText}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const itemsApi = {
  async getAll(): Promise<Item[]> {
    return fetchApi('/items');
  },

  async getOne(id: string): Promise<Item> {
    return fetchApi(`/items/${id}`);
  },

  async create(data: CreateItemData): Promise<Item> {
    return fetchApi('/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: UpdateItemData): Promise<Item> {
    return fetchApi(`/items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string): Promise<void> {
    return fetchApi(`/items/${id}`, {
      method: 'DELETE',
    });
  },
};
