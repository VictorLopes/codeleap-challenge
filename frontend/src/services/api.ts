const BASE_URL = 'http://127.0.0.1:8000/careers/';

export interface CareerData {
  id?: number;
  username: string;
  created_datetime?: string;
  title: string;
  content: string;
}

export interface CareerResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CareerData[];
}

export const api = {
  getPosts: async (url?: string, ordering?: string, search?: string): Promise<CareerResponse> => {
    let finalUrl = url ?? BASE_URL;
    if (!url) {
      const params = new URLSearchParams();
      if (ordering) params.append('ordering', ordering);
      if (search) params.append('search', search);
      const queryString = params.toString();
      if (queryString) finalUrl += `?${queryString}`;
    }
    const response = await fetch(finalUrl);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
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
