const BASE_URL = 'http://127.0.0.1:8000/careers/';

export interface CareerData {
  id?: number;
  username: string;
  created_datetime?: string;
  title: string;
  content: string;
}

export const api = {
  getPosts: async (): Promise<CareerData[]> => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch posts');
    const data = await response.json();
    return data;
  },

  createPost: async (post: CareerData): Promise<CareerData> => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  updatePost: async (id: number, post: Partial<CareerData>): Promise<CareerData> => {
    const response = await fetch(`${BASE_URL}${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  },

  deletePost: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
  },
};
